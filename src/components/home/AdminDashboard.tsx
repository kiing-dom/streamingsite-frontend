import React from 'react'
import { useUser } from '../../hooks/useUser'
import { CircularProgress } from '@mui/material';
import LogOutButton from '../buttons/LogOutButton';

const AdminDashboard: React.FC = () => {
  const userId = parseInt(localStorage.getItem('userId') ?? '0');
  const user = useUser(userId);

  if(!user) {
    return (
      <div>
        <CircularProgress
          color='inherit'
        />
      </div>
    )
  }

  return (


    <div className='flex justify-center items-center h-[84vh]'>
      Admin Dashboard
      <p className='text-black'>Username: <strong>{user?.username}</strong></p>
      <LogOutButton />
    </div>
  )
}

export default AdminDashboard