import React, { useState, useRef } from 'react';
import { useUser } from '../../hooks/useUser';
import { CircularProgress, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit, CloudUpload } from '@mui/icons-material';
import LogOutButton from '../buttons/LogOutButton';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  videoFile: File | null;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
}

const AdminDashboard: React.FC = () => {
  const userId = parseInt(localStorage.getItem('userId') ?? '0');
  const user = useUser(userId);
  const [newContent, setNewContent] = useState<ContentItem>({
    id: 0,
    title: '',
    description: '',
    videoFile: null,
    uploadStatus: 'pending'
  });
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className='flex flex-col justify-center items-center h-[84vh]'>
        <CircularProgress className='mb-5' color='inherit' />
        <LogOutButton />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContent({ ...newContent, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewContent({ ...newContent, videoFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.title && newContent.videoFile) {
      const contentItem: ContentItem = {
        ...newContent,
        id: Date.now(),
        uploadStatus: 'uploading'
      };
      setContentList([...contentList, contentItem]);

      // Simulating upload process
      try {
        // Here you would integrate with your backend API to handle the file upload
        // For example: await uploadVideoToS3(contentItem.videoFile);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating upload delay

        setContentList(prevList =>
          prevList.map(item =>
            item.id === contentItem.id ? { ...item, uploadStatus: 'completed' } : item
          )
        );
      } catch (error) {
        setContentList(prevList =>
          prevList.map(item =>
            item.id === contentItem.id ? { ...item, uploadStatus: 'error' } : item
          )
        );
      }

      setNewContent({
        id: 0,
        title: '',
        description: '',
        videoFile: null,
        uploadStatus: 'pending'
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = (id: number) => {
    setContentList(contentList.filter(item => item.id !== id));
  };

  return (
    <div className='flex flex-col items-center h-[84vh] p-8'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <p className='text-black mb-4'>Welcome, <strong>{user?.username}</strong>!</p>

      <form onSubmit={handleSubmit} className='w-full max-w-lg mb-8'>
        <TextField
          fullWidth
          label="Content Title"
          name="title"
          value={newContent.title}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newContent.description}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={3}
        />
        <input
          name='Upload'
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4"
          ref={fileInputRef}
          required
        />
        <Button type="submit" variant="contained" color="primary" startIcon={<CloudUpload />} className='mt-4'>
          Upload New Video
        </Button>
      </form>

      <div className='w-full max-w-lg'>
        <h2 className='text-xl font-semibold mb-2'>Uploaded Content</h2>
        <List>
          {contentList.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={
                  <>
                    <div>{item.description}</div>
                    <div>Status: {item.uploadStatus}</div>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>

      <LogOutButton />
    </div>
  );
};

export default AdminDashboard;