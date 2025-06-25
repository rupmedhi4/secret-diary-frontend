import * as faceapi from 'face-api.js';

export const getLiveDescriptor = async (videoRef) => {
  const detection = await faceapi
    .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
  return detection?.descriptor || null;
};


