import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-ghana-green via-earth-dark to-ghana-red flex items-center justify-center z-50">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <div className="text-ghana-gold text-xl font-semibold animate-pulse">
          Loading RichDons...
        </div>
        <div className="text-white text-sm mt-2 opacity-75">
          Preparing authentic Ghanaian experience
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;