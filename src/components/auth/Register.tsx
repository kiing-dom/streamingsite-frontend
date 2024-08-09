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
    <div className="min-h-screen bg-[#2e2e2e] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-left">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id='username-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input
              id='email-input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              id='password-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              id='first-name-input'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              id='last-name-input'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
              placeholder="Last Name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-black font-bold hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
