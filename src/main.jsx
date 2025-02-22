import React from "react";
import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";

render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.Fragment >
    , document.getElementById('app'))
