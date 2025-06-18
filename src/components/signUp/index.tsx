import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { injectCss, removeCss } from '../../utils/helpers';
import OTPVerification from '../OTP';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  userType: string;
}

const SignUpComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP,setShowOTP] = useState(false);

  const form = useForm<SignUpFormData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      userType: 'journalist',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must have at least 8 characters' : null),
      userType: (value) => (value ? null : 'Please select a user type'),
    },
  });
  React.useEffect(() => {
    let id="signIn"
    
    injectCss(id,cssStyles);
    return()=>{
        
        removeCss(id);
    }
},[])

  const handleSubmit = async (values: SignUpFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', values);
    setIsLoading(false);
    setShowOTP(true);
  };

  const BallotBox = () => (
    <div className="flex justify-center items-center flex-1 relative z-10">
      <div className="ballot-box w-36 h-28 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl relative shadow-2xl">
        <div className="ballot-slot w-24 h-1 bg-black absolute top-4 left-1/2 transform -translate-x-1/2 rounded-sm shadow-inner"></div>
        <div className="ballot-paper absolute w-14 h-10 bg-white rounded-sm bottom-7 left-1/2 transform -translate-x-1/2"></div>
        <div className="ballot-paper-2 absolute w-12 h-8 bg-white rounded-sm bottom-8 left-1/2 transform -translate-x-1/2 opacity-80"></div>
        <div className="ballot-paper-3 absolute w-11 h-7 bg-white rounded-sm bottom-9 left-1/2 transform -translate-x-1/2 opacity-60"></div>
      </div>
      <div className="voting-papers absolute -top-5 left-1/2 transform -translate-x-1/2">
        <div className="paper paper-1 w-20 h-12 bg-white absolute rounded-sm transform -rotate-12"></div>
        <div className="paper paper-2 w-20 h-12 bg-white absolute rounded-sm transform rotate-6 left-5"></div>
        <div className="paper paper-3 w-20 h-12 bg-white absolute rounded-sm transform -rotate-6 -left-5"></div>
      </div>
    </div>
  );
if(showOTP) return <OTPVerification email={form.values.email}/>
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-black to-gray-900 font-sans p-5 signup-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border-green">
        
        {/* Left Side - Ballot Box Animation */}
        <div className="p-10 lg:p-15 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0  opacity-50 pointer-events-none"></div>
          
          
          <div className="relative z-10">
            <Link to="/">
            <div className="flex items-center gap-3 text-white text-2xl font-bold mb-10">
              <div className="text-3xl logo-icon">📊</div>
              <span>ElectionWatch</span>
            </div></Link>
          </div>
          
        
          
          <div className="relative z-10">
            <h2 className="text-white text-lg font-semibold leading-relaxed mb-3">
              ElectionWatch: Combating Election Misinformation in Nigeria and Beyond with AI and Data.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We aim to support and improve election monitoring by leveraging data-driven insights.
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="p-10 lg:p-5 bg-black flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-black mb-2 form-title">Create an account</h1>
            <p className="text-gray-600 text-base mb-8 form-subtitle">
              Let's get started. Fill in the details below to create your account.
            </p>
            
            <div className="space-y-6 signup-form">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Floyd"
                  {...form.getInputProps('name')}
                  className={`w-full p-2 px-4 border-2 rounded-xl text-base bg-white transition-all duration-300 outline-none focus:transform focus:-translate-y-1 focus:shadow-xl ${
                    form.errors.name 
                      ? 'border-red-500 form-error' 
                      : 'border-gray-200 focus:border-black'
                  }`}
                />
                {form.errors.name && (
                  <span className="text-red-500 text-xs mt-1 block error-fade">
                    {form.errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="floyd.miles@example.com"
                  {...form.getInputProps('email')}
                  className={`w-full p-2 px-4 border-2 rounded-xl text-base bg-white transition-all duration-300 outline-none focus:transform focus:-translate-y-1 focus:shadow-xl ${
                    form.errors.email 
                      ? 'border-red-500 form-error' 
                      : 'border-gray-200 focus:border-black'
                  }`}
                />
                {form.errors.email && (
                  <span className="text-red-500 text-xs mt-1 block error-fade">
                    {form.errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    {...form.getInputProps('password')}
                    className={`w-full p-2 px-4 border-2 rounded-xl text-base bg-white transition-all duration-300 outline-none focus:transform focus:-translate-y-1 focus:shadow-xl pr-12 ${
                      form.errors.password 
                        ? 'border-red-500 form-error' 
                        : 'border-gray-200 focus:border-black'
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base opacity-60 hover:opacity-100 transition-opacity duration-300"
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

              <div className="form-group">
                <label htmlFor="userType" className="block text-sm font-medium text-black mb-2">
                  User Type
                </label>
                <select
                  id="userType"
                  {...form.getInputProps('userType')}
                  className={`w-full p-2 px-4 border-2 rounded-xl text-base bg-white transition-all duration-300 outline-none focus:transform focus:-translate-y-1 focus:shadow-xl ${
                    form.errors.userType 
                      ? 'border-red-500 form-error' 
                      : 'border-gray-200 focus:border-black'
                  }`}
                >
                  <option value="journalist">Journalist</option>
                  <option value="researcher">Researcher</option>
                  <option value="analyst">Analyst</option>
                  <option value="observer">Election Observer</option>
                </select>
                {form.errors.userType && (
                  <span className="text-red-500 text-xs mt-1 block error-fade">
                    {form.errors.userType}
                  </span>
                )}
              </div>

              <button 
                type="button" 
                className="w-full p-2 bg-green-500 500 text-white rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 mb-4 flex items-center justify-center min-h-14 hover:bg-green-700 hover:transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                disabled={isLoading}
                onClick={() => form.onSubmit(handleSubmit)()}
              >
                {isLoading ? (
                  <div className="loading-spinner w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>

            <div className="text-xs text-gray-600 text-center mb-6">
              By clicking "Sign up", you agree to our{' '}
              <a href="#" className="text-black font-medium hover:opacity-70 transition-opacity duration-300">
                Terms & Conditions
              </a>
            </div>

            <div className="relative text-center my-8 text-gray-600 text-sm">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-4">
                <span>OR</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center mb-6">
              <button className="w-12 h-12 border-2 border-gray-200 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-all duration-300 font-bold hover:border-black hover:transform hover:-translate-y-1 hover:shadow-xl">
                <span>G</span>
              </button>
              <button className="w-12 h-12 border-2 border-gray-200 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-all duration-300 font-bold hover:border-black hover:transform hover:-translate-y-1 hover:shadow-xl">
                <span>𝕏</span>
              </button>
              <button className="w-12 h-12 border-2 border-gray-200 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-all duration-300 font-bold hover:border-black hover:transform hover:-translate-y-1 hover:shadow-xl">
                <span>f</span>
              </button>
            </div>

            <div className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-medium cursor-default hover:opacity-70 transition-opacity duration-300">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SignUpComponent;

const cssStyles=`.signup-wrapper {
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

        .logo-icon {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
            transform: translateX(-50%) translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translateX(-50%) translateY(-50px) rotate(5deg);
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

        .signup-form {
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

        .bg-gradient-radial {
          background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        }

        @media (max-width: 1024px) {
          .ballot-box {
            width: 120px;
            height: 100px;
          }
        }
      `