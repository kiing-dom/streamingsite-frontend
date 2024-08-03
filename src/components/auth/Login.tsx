import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
      console.log(response.data);
      toast.success(response.data);
     
    } catch (error) {
      console.error(error);
      toast.error('Invalid Credentials!')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor='email-input' className="block text-gray-700">Email</label>
            <input
              id='email-input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor='password-input' className="block text-gray-700">Password</label>
            <input
              id='password-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}            
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
