import React, { useRef, useEffect, useState } from 'react';
import { startCamera, stopCamera } from './cameraUtils';
import { getLiveDescriptor } from './faceUtils';
import useFaceDetection from './useFaceDetection';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDiary } from '../../Context/DiaryContext';
import Cookies from 'js-cookie';

function FaceAuth() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [message, setMessage] = useState('Loading models...');
  const [loading, setLoading] = useState(false); // ✅ FIXED
  const { setToken } = useDiary();
  const navigate = useNavigate();

  useFaceDetection(videoRef, canvasRef, setMessage);

  useEffect(() => {
    startCamera(videoRef);
    return () => stopCamera(videoRef); // ✅ Clean up on unmount
  }, []);

  const authFace = async () => {
    setLoading(true);

    const descriptor = await getLiveDescriptor(videoRef);
    if (!descriptor) {
      toast.error('No face detected!');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
          { faceId: Array.from(descriptor) },
        {
          withCredentials: true,
        }
      );

      Cookies.set('jwt', res.data.token, {
        path: '/',
        secure: true,
        sameSite: 'None',
        expires: 14,
      });

      const token = Cookies.get('jwt');
      if (!token) {
        toast.error('Token not set!');
      } else {
        setToken(token);
        navigate('/home');
        toast.success(res.data.message);
      }

      stopCamera(videoRef);
    } catch (error) {
      console.error('Error saving face:', error);
      toast.error('Failed to authenticate face!');
    } finally {
      setLoading(false); // ✅ Always set loading to false
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading
            ? 'Please wait, we are scanning your face...'
            : 'Please Authenticate Your Face'}
        </button>
      </div>
    </div>
  );
}

export default FaceAuth;
