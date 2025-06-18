import React, { useState } from 'react';

const AccountCreatedSuccess = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    
    // Simulate navigation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically navigate to the home page
    console.log('Navigating to Home page...');
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-4">
            <div className="text-gray-900 font-bold text-lg">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="8" height="8" fill="currentColor"/>
                <rect x="16" y="6" width="8" height="8" fill="currentColor"/>
                <rect x="26" y="6" width="8" height="8" fill="currentColor"/>
                <rect x="6" y="16" width="8" height="8" fill="currentColor"/>
                <rect x="16" y="16" width="8" height="8" fill="currentColor"/>
                <rect x="26" y="16" width="8" height="8" fill="currentColor"/>
                <rect x="6" y="26" width="8" height="8" fill="currentColor"/>
                <rect x="16" y="26" width="8" height="8" fill="currentColor"/>
                <rect x="26" y="26" width="8" height="8" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="text-white font-semibold text-lg">
            <span className="inline-flex items-center">
              <span className="mr-2">□</span>
              <span>Election</span>
            </span>
            <div className="text-sm font-normal text-gray-400 mt-1">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Watch
              </span>
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Account Created Successfully
            </h1>
            <p className="text-gray-400 text-base leading-relaxed px-4">
              Your account has been created successfully. Click continue
              <br />
              to proceed to the Home page.
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className={`
                w-full max-w-sm mx-auto py-3 px-6 rounded-lg font-medium text-white
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                ${isLoading
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800 transform hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Continue to Home'
              )}
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-25 animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-green-400 rounded-full opacity-20 animate-pulse delay-3000"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreatedSuccess;