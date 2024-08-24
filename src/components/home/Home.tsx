import React, { useState, useEffect } from 'react';
import LogOutButton from '../buttons/LogOutButton';
import { useUser } from '../../hooks/useUser';
import { CircularProgress, Grid, Card, CardContent, Typography, Modal, Box, IconButton } from '@mui/material';
import { PlayArrow, Close } from '@mui/icons-material';
import { useContentStore } from '../../state/useContentStore';
import VideoPlayer from '../video/VideoPlayer'; // Import your VideoPlayer component

export default function Home() {
    const userId = parseInt(localStorage.getItem('userId') ?? '0', 10);
    const user = useUser(userId);
    const { contentList, fetchContent } = useContentStore();
    const [open, setOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    const handleOpen = (videoUrl: string) => {
        setSelectedVideoUrl(videoUrl);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVideoUrl(null);
    };

    if (!user) {
        return (
            <div className='flex flex-col justify-center items-center h-screen bg-neutral-800'>
                <CircularProgress className='mb-5' color='inherit' />
                <LogOutButton />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-neutral-900 text-white'>
            <header className='p-4 flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-red-600'>Home</h1>
                <div>
                    <span className='mr-4'>Welcome, {user?.firstName}</span>
                    <LogOutButton />
                </div>
            </header>

            <main className='p-8'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Featured Videos
                </Typography>
                <Grid container spacing={4}>
                    {contentList.map((video) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                            <Card
                                sx={{
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: '0.3s',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        '& .MuiCardContent-root': {
                                            opacity: 1,
                                        },
                                    },
                                }}
                                onClick={() => handleOpen(video.videoUrl ?? "")}
                            >
                                <div
                                    style={{
                                        width: '100%',
                                        paddingTop: '56.25%',
                                        position: 'relative',
                                        backgroundColor: 'gray',
                                        backgroundImage: `url(${video.thumbnailUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                                    <PlayArrow sx={{ fontSize: 40, color: 'white', position: 'absolute', bottom: 16, right: 16 }} />
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
                                    <Typography color="gray" variant="caption" display="block">{video.description}</Typography>
                                    <Typography color="orange" variant="caption" display="block">{video.tags.join(", ")}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="video-player-modal"
                    aria-describedby="modal-to-play-video"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box sx={{ position: 'relative', width: '80%', maxWidth: 800, outline: 0 }}>
                        <IconButton
                            sx={{ position: 'absolute', top: -10, right: -10, color: 'white', zIndex: 1 }}
                            onClick={handleClose}
                        >
                            <Close />
                        </IconButton>
                        {selectedVideoUrl && <VideoPlayer videoUrl={selectedVideoUrl} />}
                    </Box>
                </Modal>
            </main>
        </div>
    );
}
