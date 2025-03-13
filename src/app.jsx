import { useState } from 'preact/hooks'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from './redux/slices/taskSlice';
import AddtaskList from './components/AddtaskList';
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export function App() {
  const [openPopup, setOpenPopup] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [filterText, setFilterText] = useState(""); // Filter text state
  const [errors, setErrors] = useState({ title: "", description: "" }); // State for validation errors
  const dispatch = useDispatch();

  const validateForm = () => {
    try {
      taskSchema.parse({ title, description });
      setErrors({ title: "", description: "" }); // Clear previous errors
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.formErrors.fieldErrors;
        setErrors({
          title: fieldErrors.title ? fieldErrors.title[0] : "",
          description: fieldErrors.description ? fieldErrors.description[0] : "",
        });
      }
      return false;
    }
  };

  const handleSave = () => {
    if (!validateForm()) return; // Prevent saving if validation fails
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

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    if (field === "title") setTitle(value);
    if (field === "description") setDescription(value);

    validateField(field, value); // Validate as user types
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
            onChange={handleChange("title")}
            error={!!errors.title}
            helperText={errors.title}
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
            onChange={handleChange("description")}
            error={!!errors.description}
            helperText={errors.description}
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
      <AddtaskList onEdit={handleEdit} filterText={filterText} />
    </Container>
  )
}
