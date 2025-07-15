// Import React
import React from 'react';

// LoadingSpinner component to be displayed while the page is loading
const LoadingSpinner = () => {
  return (
    // The spinner is fixed to the center of the screen
    <div className="fixed inset-0 bg-gradient-to-br from-ghana-green via-earth-dark to-ghana-red flex items-center justify-center z-50">
      <div className="text-center">
        {/* The spinner animation */}
        <div className="loading-spinner mx-auto mb-4"></div>
        {/* The loading text */}
        <div className="text-ghana-gold text-xl font-semibold animate-pulse">
          Loading RichDons...
        </div>
        {/* The loading message */}
        <div className="text-white text-sm mt-2 opacity-75">
          Preparing authentic Ghanaian experience
        </div>
      </div>
    </div>
  );
};

// Export the component
export default LoadingSpinner;