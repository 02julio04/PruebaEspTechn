import { CssBaseline, Container, Typography, Box, Stack } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import useListTasks from '../hooks/useListTasks';
import TaskFilter from '../components/TaskFilter';
import { useState } from 'react';

function TaskDashboard() {
  const { tasks, loading, error, toggleComplete, addTask } = useListTasks();
  const [filter, setFilter] = useState('all');

  // Apply filtros
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // "all"
  });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#e3eaf0',
          display: 'flex',
          flexDirection: 'column',   
          alignItems: 'center',    
          justifyContent: 'flex-start',
          py: 6,
          px: 2,
        }}
      >
         <Container
            maxWidth="sm"
            sx={{
              width: '100%',

            }}
          >
          <Stack spacing={4}>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold">
                Task Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage your tasks efficiently
              </Typography>
            </Box>
            
            <TaskForm onAdd={addTask} />

            <TaskFilter filter={filter} onChange={setFilter} />

            {/* Task list */}
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onToggle={toggleComplete}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default TaskDashboard;
