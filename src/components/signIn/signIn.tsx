import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { injectCss } from '../../utils/helpers';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
React.useEffect(()=>{
  injectCss("sign-in" ,css)
},[])
  const form = useForm<SignInFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 1 ? 'Password is required' : null),
    },
  });

  const handleSubmit = async (values: SignInFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Sign in submitted:', values);
    setIsLoading(false);
  };

  const BallotBox = () => (
    <div className="flex justify-center items-center flex-1 relative z-10">
      <div className="ballot-box w-64 h-52 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl relative shadow-2xl">
        <div className="ballot-slot w-32 h-1.5 bg-black absolute top-6 left-1/2 transform -translate-x-1/2 rounded-sm shadow-inner"></div>
        
        {/* Ballot papers inside */}
        <div className="ballot-paper absolute w-20 h-14 bg-white rounded-sm bottom-12 left-1/2 transform -translate-x-1/2"></div>
        <div className="ballot-paper-2 absolute w-18 h-12 bg-white rounded-sm bottom-14 left-1/2 transform -translate-x-1/2 opacity-80"></div>
        <div className="ballot-paper-3 absolute w-16 h-10 bg-white rounded-sm bottom-16 left-1/2 transform -translate-x-1/2 opacity-60"></div>
        
        {/* Side panels */}
        <div className="absolute left-0 top-8 w-16 h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-l-xl"></div>
        <div className="absolute right-0 top-8 w-16 h-32 bg-gradient-to-l from-gray-600 to-gray-700 rounded-r-xl"></div>
        
        {/* Front panel details */}
        <div className="absolute inset-x-8 top-16 bottom-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg">
          <div className="absolute top-4 left-4 w-8 h-8 bg-gray-800 rounded-full"></div>
          <div className="absolute top-4 right-4 w-8 h-6 bg-gray-800 rounded"></div>
          <div className="absolute bottom-8 left-4 right-4 h-12 bg-gray-800 rounded opacity-50"></div>
        </div>
        
        {/* Base/legs */}
        <div className="absolute -bottom-2 left-8 right-8 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg"></div>
      </div>
      
      {/* Floating papers */}
      <div className="voting-papers absolute -top-5 left-1/2 transform -translate-x-1/2">
        <div className="paper paper-1 w-24 h-16 bg-white absolute rounded-sm transform -rotate-12 shadow-lg"></div>
        <div className="paper paper-2 w-24 h-16 bg-white absolute rounded-sm transform rotate-6 left-6 shadow-lg"></div>
        <div className="paper paper-3 w-24 h-16 bg-white absolute rounded-sm transform -rotate-6 -left-6 shadow-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-sans p-5 signin-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Ballot Box Animation */}
       
        <div className="p-10 lg:p-15 flex flex-col justify-between bg-black relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white text-2xl font-bold mb-10">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="text-sm font-normal">Election</div>
                <div className="text-lg font-bold -mt-1">Watch</div>
              </div>
            </div>
          </div>
          
          
       
          
          <div className="relative z-10 border border-gray-600 rounded-lg p-6 mt-8">
            <h2 className="text-white text-lg font-semibold leading-relaxed mb-3">
              ElectionWatch: Combating Election Misinformation in Nigeria and Beyond with AI and Data.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We aim to support and improve election monitoring by leveraging data-driven insights.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="p-10 lg:p-15 bg-black flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-white mb-2 form-title">Sign in to your Account</h1>
            <p className="text-gray-400 text-base mb-8 form-subtitle">
              Enter your email and password to sign in to your account.
            </p>
            
            <div className="space-y-6 signin-form">
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...form.getInputProps('email')}
                  className={`w-full p-2 border-2 rounded-xl text-base bg-gray-100 text-black transition-all duration-300 outline-none focus:transform focus:-translate-y-1 focus:shadow-xl ${
                    form.errors.email 
                      ? 'border-red-500 form-error' 
                      : 'border-gray-300 focus:border-gray-500'
                  }`}
                />
                {form.errors.email && (
                  <span className="text-red-500 text-xs mt-1 block error-fade">
                    {form.errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...form.getInputProps('password')}
                    className={`w-full p-2 border-2 rounded-xl text-base bg-gray-100 text-black transition-all duration-300 outline-none focus:transform focus:-translate-y-1 focus:shadow-xl pr-12 ${
                      form.errors.password 
                        ? 'border-red-500 form-error' 
                        : 'border-gray-300 focus:border-gray-500'
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base text-gray-600 hover:text-gray-800 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {form.errors.password && (
                  <span className="text-red-500 text-xs mt-1 block error-fade">
                    {form.errors.password}
                  </span>
                )}
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    className="sr-only"
                  />
                  <label htmlFor="remember" className="flex items-center cursor-pointer">
                    <div className="w-5 h-5 border-2 border-pink-500 rounded-full mr-3 flex items-center justify-center bg-transparent">
                      <div className="w-2 h-2 bg-pink-500 rounded-full opacity-0 remember-dot"></div>
                    </div>
                    <span className="text-white text-sm">Remember me</span>
                  </label>
                </div>
              </div>

              <button 
                type="button" 
                className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 mb-4 flex items-center justify-center min-h-14 hover:transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={() => form.onSubmit(handleSubmit)()}
              >
                {isLoading ? (
                  <div className="loading-spinner w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="relative text-center my-8 text-gray-400 text-sm">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative bg-black px-4">
                <span>OR</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center mb-6">
              <button className="w-12 h-12 border-2 border-gray-600 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-all duration-300 font-bold hover:border-gray-400 hover:transform hover:-translate-y-1 hover:shadow-xl">
                <span className="text-black">G</span>
              </button>
              <button className="w-12 h-12 border-2 border-gray-600 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-all duration-300 font-bold hover:border-gray-400 hover:transform hover:-translate-y-1 hover:shadow-xl">
                <span className="text-black">𝕏</span>
              </button>
              <button className="w-12 h-12 border-2 border-gray-600 rounded-xl bg-blue-600 flex items-center justify-center cursor-pointer transition-all duration-300 font-bold hover:bg-blue-700 hover:transform hover:-translate-y-1 hover:shadow-xl">
                <span className="text-white">f</span>
              </button>
            </div>

            <div className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              
              <Link to="/sign-up" className="text-orange-500 font-medium hover:text-orange-400 transition-colors duration-300">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default SignInComponent;
const css=`
        .signin-wrapper {
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ballot-box {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .ballot-paper {
          animation: paperDrop 4s ease-in-out infinite;
          animation-delay: 0s;
        }

        .ballot-paper-2 {
          animation: paperDrop 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .ballot-paper-3 {
          animation: paperDrop 4s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes paperDrop {
          0% { 
            transform: translateX(-50%) translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translateX(-50%) translateY(-25px) rotate(3deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(0px) rotate(0deg);
            opacity: 1;
          }
        }

        .paper-1 {
          animation: paperFloat 6s ease-in-out infinite;
          animation-delay: 0s;
        }

        .paper-2 {
          animation: paperFloat 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .paper-3 {
          animation: paperFloat 6s ease-in-out infinite;
          animation-delay: 4s;
        }

        @keyframes paperFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(var(--tw-rotate));
            opacity: 0;
          }
          50% { 
            transform: translateY(-30px) rotate(var(--tw-rotate));
            opacity: 0.7;
          }
        }

        .form-title {
          animation: fadeInDown 0.6s ease-out;
        }

        .form-subtitle {
          animation: fadeInDown 0.6s ease-out 0.2s both;
        }

        .signin-form {
          animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-error {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .error-fade {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        input[type="checkbox"]:checked + label .remember-dot {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .ballot-box {
            width: 200px;
            height: 160px;
          }
        }
      `