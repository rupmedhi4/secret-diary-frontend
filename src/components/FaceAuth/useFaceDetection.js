import { useEffect } from 'react';
import * as faceapi from 'face-api.js';

const useFaceDetection = (videoRef, canvasRef, setMessage) => {
  useEffect(() => {
    let intervalId;
    const MODEL_URL = '/models';

    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

        setMessage('Scan Your Face');
      } catch (error) {
        setMessage('something is wrong ');
        console.error('Model load error:', error);
      }
    };


    const startDetection = () => {
      const video = videoRef.current;
      const canvasWrapper = canvasRef.current;

      if (!video || !canvasWrapper) return;

      const canvas = faceapi.createCanvasFromMedia(video);
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '10';

      canvasWrapper.innerHTML = '';
      canvasWrapper.append(canvas);

      const displaySize = {
        width: video.width,
        height: video.height,
      };
      faceapi.matchDimensions(canvas, displaySize);

      intervalId = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resized = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);
      }, 300);
    };

    loadModels().then(() => {
      if (videoRef.current) {
        videoRef.current.addEventListener('play', startDetection);
      }
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [videoRef, canvasRef, setMessage]);
};

export default useFaceDetection;
