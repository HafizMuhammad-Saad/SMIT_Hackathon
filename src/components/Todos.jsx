import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';
import { Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Paper, styled } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
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

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return (
    <Box>
      <Typography variant="h6" color="text.secondary" mb={2}>
        Your Tasks
      </Typography>
      <List>
        {todos.map((todo) => (
          <TodoListPaper key={todo.id} elevation={2}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => dispatch(removeTodo(todo.id))} color="error">
                  <Delete />
                </IconButton>
              }
              sx={{
                py: 2,
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <ListItemText
                primary={todo.text}
                primaryTypographyProps={{
                  variant: 'body1',
                  color: 'text.primary',
                  sx: { fontWeight: 500 }
                }}
              />
            </ListItem>
          </TodoListPaper>
        ))}
      </List>
    </Box>
  );
}

export default Todos;
