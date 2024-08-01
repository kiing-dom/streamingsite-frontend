import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <>
      <Login />
      <Register />
    </>
  );
}

export default App;
