import { useState } from 'preact/hooks'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from './redux/slices/taskSlice';
import AddtaskList from './components/AddtaskList';

export function App() {
  const [openPopup, setOpenPopup] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [filterText, setFilterText] = useState(""); // Filter text state
  const dispatch = useDispatch();

  const handleSave = () => {
    if (editingTask) {
      // If editing, update task
      dispatch(updateTask({ id: editingTask.id, title, description }));
    } else {
      // Otherwise, add a new task
      dispatch(addTask({ title, description }));
    }
    setTitle('');
    setDescription('');
    setEditingTask(null);
    setOpenPopup(false);

  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setOpenPopup(true);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        React CRUD With Redux
      </Typography>
      {/* Filter Input */}
      <TextField
        label="Filter Tasks"
        variant="outlined"
        fullWidth
        margin="dense"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <Button variant="outlined" color="primary" onClick={() => setOpenPopup(true)}>
        Add Task
      </Button>
      {/* Dialog Box */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the task details below:</DialogContentText>

          {/* Title Input Field */}
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description Input Field */}
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="dense"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenPopup(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <AddtaskList onEdit={handleEdit} />
    </Container>
  )
}
