import React from "react";
import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";
import Dropdown from "./Dropdown.js";
import SmallCrud from "./SmallCrud.js";
import { CheckBox } from "./CheckBox.js";
import Apptodo from "./Apptodo.jsx";

render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {/* <App /> */}
                {/* <Dropdown/> */}
                {/* <SmallCrud/> */}
                {/* <CheckBox/> */}
                <Apptodo/>
            </PersistGate>
        </Provider>
    </React.Fragment >
    , document.getElementById('app'))
