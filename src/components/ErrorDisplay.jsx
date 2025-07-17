export default function ErrorDisplay({ onRetry, onGoHome, errorId }) {
  const uniqueErrorId = errorId.split('-')[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animated container */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl animate-pulse">
          {/* Icon with rotation animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center animate-bounce">
                <svg
                  className="w-8 h-8 text-red-400 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* Ripple effect */}
              <div className="absolute inset-0 w-16 h-16 bg-red-500/10 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Error message */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white animate-fadeIn">
              Something went wrong
            </h2>
            <p className="text-gray-300 leading-relaxed animate-fadeIn animation-delay-200">
              We encountered an unexpected error. Our team has been notified and
              is working on a fix.
            </p>

            {/* Error ID for support */}
            {errorId && (
              <div className="bg-gray-700/30 rounded-lg p-3 animate-fadeIn animation-delay-400">
                <p className="text-xs text-gray-400">
                  Error ID:{' '}
                  <span className="font-mono text-red-400">
                    {uniqueErrorId}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onRetry}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 animate-slideUp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Try Again
            </button>

            <button
              onClick={onGoHome}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 animate-slideUp animation-delay-100"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Go Home
            </button>
          </div>
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400/20 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/20 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-float animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
}
