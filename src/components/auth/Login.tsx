import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserStore } from '../../state/userStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setCredentials = useUserStore(state => state.setCredentials);
  const fetchUser = useUserStore(state => state.fetchUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Perform login
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      const { role, userId, message } = response.data;

      // Store credentials and user data in Zustand
      setCredentials(email, password);

      // Store user role and ID in local storage
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', userId.toString());

      // Fetch user data
      await fetchUser(userId);

      // Show success message
      console.log(message);
      toast.success(message);

      // Redirect based on user role
      if (role === 'ADMIN') {
        navigate('/admin_dashboard');
      } else {
        navigate('/home');
      }

    } catch (error) {
      console.error(error);
      toast.error('Invalid Credentials!');
    }
  };

  return (
    <div className="min-h-screen bg-[#2e2e2e] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-left">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor='email-input' className="block text-gray-700">Email</label>
            <input
              id='email-input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Email"
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
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}            
            className="text-black font-bold hover:underline focus:outline-none"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
