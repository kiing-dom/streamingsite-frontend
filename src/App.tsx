import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
      <Router>
        <div>
          <Toaster
            position='bottom-center'
          />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
