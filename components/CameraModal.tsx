import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from '../contexts/LanguageContext';

interface CameraModalProps {
  onClose: () => void;
  onCapture: (file: File) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose, onCapture }) => {
  const { t } = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    // Stop any existing stream before starting a new one
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Prefer rear camera
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(t('cameramodal_error'));
    }
  }, [t, stream]);
  
  useEffect(() => {
    startCamera();
    
    // Cleanup function to stop the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only want this to run once on mount. startCamera is memoized.

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        // Stop the stream after capturing
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleAccept = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob(blob => {
        if (blob) {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          onCapture(file);
        }
      }, 'image/jpeg');
    }
  };
  
  const handleClose = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
            <h3 className="text-lg font-semibold">{t('cameramodal_title')}</h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>
        <div className="relative aspect-video bg-gray-900">
            {error && <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">{error}</div>}
            
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-contain ${capturedImage || error ? 'hidden' : 'block'}`}
            />
            
            <canvas ref={canvasRef} className="hidden" />

            {capturedImage && (
                <img src={capturedImage} alt="Captured preview" className="w-full h-full object-contain" />
            )}
        </div>
        <div className="p-4 bg-gray-50 flex justify-center items-center space-x-4">
            {!capturedImage ? (
                 <button onClick={handleCapture} disabled={!!error || !stream} className="bg-[#1F7A6B] text-white font-bold py-3 px-6 rounded-full disabled:bg-gray-400 hover:bg-teal-800 transition-colors">
                    {t('cameramodal_take_photo')}
                </button>
            ) : (
                <>
                    <button onClick={handleRetake} className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors">
                        {t('cameramodal_retake')}
                    </button>
                    <button onClick={handleAccept} className="bg-[#1F7A6B] text-white font-bold py-3 px-6 rounded-full hover:bg-teal-800 transition-colors">
                        {t('cameramodal_accept')}
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
