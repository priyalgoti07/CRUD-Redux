[Live version of the site can be found here](https://priyalgoti07.github.io/CRUD-Redux/)

🚀 Redux Project: Task Management System
1) CRUD Operations Using Redux Toolkit
- You have successfully implemented Create, Read, Update, and Delete (CRUD) functionalities for tasks.
- Used createSlice from Redux Toolkit for state management.
- Actions like addTask, removeTask, and updateTask are handled via Redux reducers.

2) Task Deletion Confirmation Dialog (MUI)
- Implemented a confirmation Dialog before deleting a task.
- Clicking Delete removes the task, while Disagree cancels the action.
- DialogActions used to handle button clicks (dispatch(removeTask(id))).

3) Task Storage in localStorage via localForage
- Initially, you tried using Redux Persist, but it defaulted to localStorage.
- This ensures tasks persist even after a page refresh.

4) Redux Store Setup
- Used configureStore from Redux Toolkit.
- Integrated asynchronous state loading from IndexedDB.
- Redux state is subscribed to save updates automatically.

5) Handling Redux Store Import Issues
- Encountered Uncaught SyntaxError: The requested module '/src/redux/store.js' does not provide an export named 'default'.
- Resolved by ensuring the correct export of store and using createStore() in index.js.

6) UI Enhancements
- Updated the Delete button color to red (<Button color="error">Delete</Button>).
- Used Material-UI components like Dialog, Button, DialogActions, etc.
- Fixing Redux Persist Issues
