import React, { useState } from 'react';
import { Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Paper, styled } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

// Custom styled components
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[4]
}));

const TodoListPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '12px',
  '&:hover': {
    boxShadow: theme.shadows[6]
  },
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.short
  })
}));

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  function addTodoHandler(e) {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  }
  return (
    <form onSubmit={addTodoHandler}>
      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            sx: { borderRadius: '8px' }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{
            px: 4,
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default AddTodo;
