import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ApptodoTable = ({ onEdit, sendDataToParent }) => {
    const apptodoList = useSelector((state) => state.apptodo.apptodo);
    const onEdittodoRow = (updaterow) => {
        onEdit()
        sendDataToParent(updaterow)
    }
    return (
        <TableContainer component={Paper} sx={{ mt: 6 }}>
            <Typography variant='h6'>AppTodo List</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Sr</strong></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Contact</strong></TableCell>
                        <TableCell><strong>Gender</strong></TableCell>
                        <TableCell><strong>Subject</strong></TableCell>
                        <TableCell><strong>Country</strong></TableCell>
                        <TableCell><strong>City</strong></TableCell>
                        <TableCell align='center'><strong>Action</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        apptodoList.length > 0 ? (
                            apptodoList?.map((item, index) => {
                                return (
                                    <TableRow key={item.index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.subjects?.join(', ')}</TableCell>
                                        <TableCell>{item.countries}</TableCell>
                                        <TableCell>{item.city}</TableCell>
                                        <TableCell align='center'>
                                            <IconButton color='success' onClick={() => onEdittodoRow(item)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color='error'>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                )
                            })) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">No tasks added.</TableCell>
                            </TableRow>
                        )

                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
