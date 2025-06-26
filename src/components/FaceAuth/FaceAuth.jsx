import React, { useRef, useEffect, useState } from 'react';
import { startCamera, stopCamera } from './cameraUtils';
import { getLiveDescriptor } from './faceUtils';
import useFaceDetection from './useFaceDetection';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FaceAuth({onLogin}) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [message, setMessage] = useState('Loading models...');
  const [loading, setLoading] = useState('false');

  const navigate = useNavigate()

  useFaceDetection(videoRef, canvasRef, setMessage);

  useEffect(() => {
    startCamera(videoRef);
  }, []);

  const authFace = async () => {
    setLoading(true)
    const descriptor = await getLiveDescriptor(videoRef);

    if (!descriptor) {
      toast.error('No face detected!');
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/user/signup", {
        faceId: JSON.stringify(Array.from(descriptor))
      }, {
        withCredentials: true
      });
      toast.success(res.data.message);
      setLoading(false)
         onLogin();
      navigate('/home')
     stopCamera(videoRef);
      console.log(res);
    } catch (error) {
      toast.error('Failed to save face!');
      console.error('Error saving face:', error);
    }
  };



  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-2">🔐 Face Login</h2>
      <p className="text-sm text-gray-500 mb-3">{message}</p>

      <div className="relative inline-block">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="400"
          height="300"
          className="rounded"
        />
        <div
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{ width: '400px', height: '300px' }}
        />
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={authFace}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50  cursor-pointer"
          disabled={loading === true}
        >
          {loading === true ? "Please wait, we are scanning your face..." : "Please Authenticate Your Face"}
        </button>
      </div>

    </div>
  );
}

export default FaceAuth;
