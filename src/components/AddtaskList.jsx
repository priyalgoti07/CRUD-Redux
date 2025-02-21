import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../redux/slices/taskSlice';

const AddtaskList = ({onEdit}) => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

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
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <TableRow key={task.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell align="right">
                                <IconButton color="success"  onClick={() => onEdit(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => dispatch(removeTask(task.id))}>
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
        </TableContainer>
    );
};

export default AddtaskList;
