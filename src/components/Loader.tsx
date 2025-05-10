import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <span className="brace-left"></span>
        <span className="letter text-green-400">H</span>
        <span className="brace-right"></span>
      </div>
      <style jsx>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #000; /* Change background color as needed */
          z-index: 9999;
        }
        .loader {
          color: #fff;
          font-family: Consolas, Menlo, Monaco, monospace;
          font-weight: bold;
          font-size: 78px;
          opacity: 0.8;
          display: flex;
          align-items: center;
        }
        .brace-left::before {
          content: "{";
          display: inline-block;
          animation: pulse 0.4s alternate infinite ease-in-out;
        }
        .brace-right::before {
          content: "}";
          display: inline-block;
          animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
        }
        .letter {
          margin: 0 5px;
          display: inline-block;
          animation: pulse 0.4s 0.15s alternate infinite ease-in-out;
        }
        @keyframes pulse {
          to {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;