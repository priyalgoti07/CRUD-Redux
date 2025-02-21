import React from "react";
import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

render(
    <React.Fragment>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Fragment >
    , document.getElementById('app'))
