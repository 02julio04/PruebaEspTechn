import {
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Divider,
  Collapse,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState } from 'react';

export default function TaskList({ tasks, loading, error, onToggle }) {
  // Estado para mostrar mensaje al completar una tarea
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Función para manejar el botón
    const handleToggle = (task) => {
    const willBeCompleted = !task.completed;
    onToggle(task.id);

    // Configuramos feedback
    setSnackbar({
        open: true,
        message: willBeCompleted
        ? `Marked "${task.title}" as done`
        : `Marked "${task.title}" as pending`,
        severity: willBeCompleted ? 'info' : 'error',
    });
    };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  if (error)
    return <Typography color="error">Error loading tasks: {error}</Typography>;

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: '#fff',
          boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Task List
        </Typography>

        <List disablePadding>
          {tasks.map((task, index) => (
            <div key={task.id}>
              <Collapse in={true} timeout={300}>
                <ListItem
                  disableGutters
                  sx={{
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary={task.title}
                    primaryTypographyProps={{
                      sx: {
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'gray' : 'text.primary',
                        fontSize: '1rem',
                      },
                    }}
                  />
                  <Button
                    variant={task.completed ? 'contained' : 'outlined'}
                    color={task.completed ? 'success' : 'secondary'}
                    size="small"
                    onClick={() => handleToggle(task)}
                  >
                    {task.completed ? 'DONE' : 'PENDING'}
                  </Button>
                </ListItem>
              </Collapse>
              {index < tasks.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
