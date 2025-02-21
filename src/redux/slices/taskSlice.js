import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description
            })
        },
        updateTask: (state, action) => {
            const { id, title, description } = action.payload;
            const existingTask = state.tasks.find(task => task.id === id);
            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        }
    }
})

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;