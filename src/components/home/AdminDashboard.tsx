import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { CircularProgress, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import LogOutButton from '../buttons/LogOutButton';

const AdminDashboard: React.FC = () => {
  const userId = parseInt(localStorage.getItem('userId') ?? '0');
  const user = useUser(userId);
  const [newContent, setNewContent] = useState({ title: '', description: '', url: '' });
  const [contentList, setContentList] = useState<Array<{ id: number; title: string; description: string; url: string }>>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.title && newContent.url) {
      setContentList([...contentList, { id: Date.now(), ...newContent }]);
      setNewContent({ title: '', description: '', url: '' });
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
        <TextField
          fullWidth
          label="Content URL"
          name="url"
          value={newContent.url}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" className='mt-4'>
          Upload New Content
        </Button>
      </form>

      <div className='w-full max-w-lg'>
        <h2 className='text-xl font-semibold mb-2'>Uploaded Content</h2>
        <List>
          {contentList.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={item.description}
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