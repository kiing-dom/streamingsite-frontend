import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        username,
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response.data);
      toast.success(response.data);

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong !')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor='username-input' className="block text-gray-700">Username</label>
            <input
              id='username-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
              required
            />
          </div>
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
          <div>
            <label htmlFor='first-name-input' className="block text-gray-700">First Name</label>
            <input
              id='first-name-input'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label htmlFor='last-name-input' className="block text-gray-700">Last Name</label>
            <input
              id='last-name-input'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your last name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/')}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
