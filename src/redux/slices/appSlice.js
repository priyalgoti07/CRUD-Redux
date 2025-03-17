import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
    apptodo: [],
}

const appSlice = createSlice({
    name: 'apptodo',
    initialState,
    reducers: {
        addtodo: (state, action) => {
            state.apptodo.push({
                id: nanoid(),
                ...action.payload
            })
        }
    }
})
export const { addtodo } = appSlice.actions;
export default appSlice.reducer;