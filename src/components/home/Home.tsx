import React from 'react'
import LogOutButton from '../buttons/LogOutButton'
import { useUser } from '../../hooks/useUser';
import { CircularProgress } from '@mui/material';

export default function Home() {

  const userId = parseInt(localStorage.getItem('userId') ?? '0', 10);
  const user = useUser(userId);

  
  if(!user) {
    return (
      <div className='flex flex-col justify-center items-center h-[84vh]'>
        <CircularProgress
        className='mb-5'
          color='inherit'
        />
        <LogOutButton />
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center h-[84vh]'>
      Welcome, {user?.username}
      <LogOutButton />
    </div>
    
  )
}
