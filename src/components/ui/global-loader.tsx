import { useLoadingStore } from '@/core/stores/use-loading.store';
import React from 'react';

const GlobalLoader: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <style>
        {`
          /* Top progress bar animation */
          .loader-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            overflow: hidden;
          }
          .loader-bar-inner {
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, #4f46e5, #a855f7, #ec4899);
            animation: loading-bar-animation 2s infinite ease-in-out;
            transform-origin: left;
          }
          @keyframes loading-bar-animation {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }

          /* Central vortex animation */
          .vortex-loader {
            position: relative;
            width: 80px;
            height: 80px;
          }
          .vortex-ring {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 4px solid transparent;
            animation: spin 1.5s linear infinite;
          }
          .vortex-ring:nth-child(1) {
            border-top-color: #6366f1; /* Indigo */
            animation-duration: 1.5s;
          }
          .vortex-ring:nth-child(2) {
            border-right-color: #a855f7; /* Purple */
            animation-duration: 2s;
            animation-direction: reverse;
          }
          .vortex-ring:nth-child(3) {
            border-bottom-color: #ec4899; /* Pink */
            animation-duration: 2.5s;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          /* Loading text animation */
          .loading-text {
            margin-top: 20px;
            color: #e0e0e0;
            font-size: 1.1rem;
            letter-spacing: 1px;
            animation: pulse 2s infinite ease-in-out;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `}
      </style>

      {/* Top Progress Bar */}
      <div className="loader-bar">
        <div className="loader-bar-inner"></div>
      </div>

      {/* Central Vortex and Text */}
      <div className="flex flex-col items-center">
        <div className="vortex-loader">
          <div className="vortex-ring"></div>
          <div className="vortex-ring"></div>
          <div className="vortex-ring"></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
