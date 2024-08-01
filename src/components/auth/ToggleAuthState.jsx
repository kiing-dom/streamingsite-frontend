// Auth.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {isLogin ? (
          <>
            <Login />
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-500 hover:underline focus:outline-none"
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-indigo-500 hover:underline focus:outline-none"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
