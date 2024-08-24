import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { CircularProgress, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel, Typography, Box, Container, Grid, Paper } from '@mui/material';
import { Delete, Edit, CloudUpload, Person, AccessTime, Category, Movie, Speed, ImageOutlined } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import LogOutButton from '../buttons/LogOutButton';
import { useContentStore } from '../../state/useContentStore';
import TagInput from '../ui/TagInput';

const AdminDashboard: React.FC = () => {
  const userId = parseInt(localStorage.getItem('userId') ?? '0');
  const user = useUser(userId);

  const [isContentLoading, setIsContentLoading] = useState(false);

  const {
    contentList,
    newContent,
    setNewContent,
    videoFile,
    thumbnailFile,
    setVideoFile,
    setThumbnailFile,
    fetchContent,
    fetchCategories,
    categories,
    handleSubmit,
    handleDelete,
  } = useContentStore();

  useEffect(() => {
    fetchContent();
    fetchCategories(); // Fetch categories on component mount
  }, [fetchContent, fetchCategories]);

  const handleVideoDrop = (acceptedFiles: File[]) => {
    setVideoFile(acceptedFiles[0]);
  };

  const handleThumbnailDrop = (acceptedFiles: File[]) => {
    setThumbnailFile(acceptedFiles[0]);
  };

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: handleVideoDrop,
    accept: {
      'video/*': []
    },
    maxFiles: 1
  });

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    onDrop: handleThumbnailDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  if (!user) {
    return (
      <div className='flex flex-col justify-center items-center h-[84vh]'>
        <CircularProgress className='mb-5' color='inherit' />
        <LogOutButton />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewContent({ ...newContent, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewContent({ ...newContent, [name]: value });
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    const selectedCategoryId = e.target.value as number;
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

    if (selectedCategory) {
      setNewContent({ category: selectedCategory });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
    setIsContentLoading(true);

    await fetchContent();
    setIsContentLoading(false);
  }


  return (
    <Box sx={{ bgcolor: '#141414', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#E50914', mb: 4, fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: '#fff', mb: 4 }}>
          Welcome, <Box component="span" sx={{ fontWeight: 'bold' }}>{user?.username}</Box>!
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#222', color: '#fff' }}>
              <Typography variant="h5" sx={{ mb: 3 }}>Add New Content</Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  fullWidth
                  label="Content Title"
                  name="title"
                  value={newContent.title}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  variant="filled"
                  sx={{ mb: 2, input: { color: '#fff' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
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
                  variant="filled"
                  sx={{ mb: 2, textarea: { color: '#fff' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
                <TextField
                  fullWidth
                  label="Instructor"
                  name="instructor"
                  value={newContent.instructor}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  variant="filled"
                  sx={{ mb: 2, input: { color: '#fff' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="durationMinutes"
                  type="number"
                  value={newContent.durationMinutes}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  variant="filled"
                  sx={{ mb: 2, input: { color: '#fff' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
                <FormControl fullWidth margin="normal" variant="filled" sx={{ mb: 2 }}>
                  <InputLabel sx={{ color: '#aaa' }}>Difficulty Level</InputLabel>
                  <Select
                    name="difficultyLevel"
                    value={newContent.difficultyLevel}
                    onChange={handleSelectChange}
                    sx={{ color: '#fff' }}
                  >
                    <MenuItem value="BEGINNER">Beginner</MenuItem>
                    <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                    <MenuItem value="ADVANCED">Advanced</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="filled" sx={{ mb: 2 }}>
                  <InputLabel sx={{ color: '#aaa' }}>Category</InputLabel>
                  <Select
                    name="category"
                    value={newContent.category?.id || ''}
                    onChange={handleCategoryChange}
                    displayEmpty
                    sx={{ color: '#fff' }}
                  >
                    <MenuItem value="" disabled>Select a category</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TagInput
                  tags={newContent.tags}
                  setTags={(newTags) => setNewContent({ ...newContent, tags: newTags })}
                />

                <Box
                  {...getVideoRootProps()}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '2px dashed #E50914',
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <input {...getVideoInputProps()} />
                  <Movie sx={{ fontSize: 48, color: '#E50914', mb: 1 }} />
                  {videoFile ? (
                    <Typography>{videoFile.name}</Typography>
                  ) : (
                    <Typography>Add a Video</Typography>
                  )}
                </Box>

                <Box
                  {...getThumbnailRootProps()}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '2px dashed #E50914',
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <input {...getThumbnailInputProps()} />
                  <ImageOutlined sx={{ fontSize: 48, color: '#E50914', mb: 1 }} />
                  {thumbnailFile ? (
                    <Typography>{thumbnailFile.name}</Typography>
                  ) : (
                    <Typography>Add a Thumbnail</Typography>
                  )}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{
                    mt: 2,
                    bgcolor: '#E50914',
                    '&:hover': { bgcolor: '#B20710' }
                  }}
                >
                  Upload New Content
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#222', color: '#fff' }}>
              <Typography variant="h5" sx={{ mb: 3 }}>Uploaded Content</Typography>
              <List>
                {contentList.map((item) => (
                  <ListItem key={item.id} sx={{ mb: 2, bgcolor: '#333', borderRadius: 1 }}>
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>}
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: '#bbb' }}>{item.description}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Person sx={{ mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: '#bbb' }}>{item.instructor}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <AccessTime sx={{ mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: '#bbb' }}>{item.durationMinutes} minutes</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Speed sx={{ mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: '#bbb' }}>{item.difficultyLevel}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Category sx={{ mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: '#bbb' }}>{item.tags?.join(', ')}</Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ color: '#fff' }}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)} sx={{ color: '#E50914' }}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              {isContentLoading && (
                <div className='flex flex-col justify-center items-center'>
                <CircularProgress className='mb-5' color='inherit'  />
              </div>
              )}

            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <LogOutButton />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
