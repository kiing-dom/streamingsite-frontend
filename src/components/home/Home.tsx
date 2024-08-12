import React from 'react';
import LogOutButton from '../buttons/LogOutButton';
import { useUser } from '../../hooks/useUser';
import { CircularProgress, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

// Mock data for videos
const mockVideos = [
  { id: 1, title: 'Video 1' },
  { id: 2, title: 'Video 2'},
  { id: 3, title: 'Video 3'},
  { id: 4, title: 'Video 4'},
  { id: 5, title: 'Video 5'},
  { id: 6, title: 'Video 6'},
  // Add more mock videos as needed
];

export default function Home() {
  const userId = parseInt(localStorage.getItem('userId') ?? '0', 10);
  const user = useUser(userId);

  if (!user) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-black'>
        <CircularProgress className='mb-5' color='inherit' />
        <LogOutButton />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <header className='p-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-red-600'>Home</h1>
        <div>
          <span className='mr-4'>Welcome, {user?.username}</span>
          <LogOutButton />
        </div>
      </header>

      <main className='p-8'>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Videos
        </Typography>
        <Grid container spacing={4}>
          {mockVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
              <Card 
                sx={{ 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  color: 'white',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    '& .MuiCardContent-root': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <div
                  style={{
                    width: '100%',
                    paddingTop: '56.25%',
                    backgroundColor: 'gray'
                  }}
                >
                  
                </div>
                <CardContent 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    opacity: 0,
                    transition: '0.3s',
                  }}
                >
                  <Typography variant="h6">{video.title}</Typography>
                  <PlayArrow sx={{ fontSize: 40 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}