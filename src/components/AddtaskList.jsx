import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../redux/slices/taskSlice';
import { useState } from 'preact/hooks';

const AddtaskList = ({ onEdit, filterText }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [passremoveId, setPassremoveID] = useState();
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    const filterData = tasks.filter((item) => item.title.toLowerCase().includes(filterText.toLowerCase()))

    const handleTaskremove = (task) => {
        setPassremoveID(task.id)
        setOpenDialog(true)
    }
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ p: 2 }}>Task List</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>ID</strong></TableCell>
                        <TableCell><strong>Title</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterData.length > 0 ? (
                        filterData.map((task, index) => (
                            <TableRow key={task.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="success" onClick={() => onEdit(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleTaskremove(task)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">No tasks added.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete Task ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete this task? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined'
                        onClick={() => setOpenDialog(false)} >
                        Disagree
                    </Button>
                    <Button variant='outlined'
                        onClick={() => { dispatch(removeTask(passremoveId)); setOpenDialog(false) }}
                        color='error'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default AddtaskList;
