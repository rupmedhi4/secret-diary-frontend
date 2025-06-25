import { toast } from "react-toastify";

export const startCamera = async (videoRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  } catch (error) {
    toast.error('Failed to access camera');
  }
};

export const stopCamera = (videoRef) => {
  const stream = videoRef.current?.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  }
};
