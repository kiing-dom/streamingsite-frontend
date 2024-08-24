import React, { useState } from 'react';
import { TextField, Chip, Box } from '@mui/material';

interface TagInputProps {
  tags: string[] | undefined;
  setTags: (tags: string[] | undefined) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', bgcolor: '#222', p: 1, borderRadius: 1 }}>
      {tags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => removeTag(tag)}
          sx={{ bgcolor: '#E50914', color: '#fff', borderRadius: 1, '&:hover': { bgcolor: '#B20710' } }}
        />
      ))}
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        label="Add a tag"
        variant="filled"
        size="small"
        sx={{ 
          input: { color: '#fff' },
          '& .MuiFilledInput-root': { bgcolor: '#333', borderRadius: 1, '&:hover': { bgcolor: '#444' } }
        }}
      />
    </Box>
  );
};

export default TagInput;
