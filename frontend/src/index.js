import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from "redux-thunk";

import App from './App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>, document.querySelector("#home")

);