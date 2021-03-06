import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
// import thunk from 'redux-thunk'

const storeHistory = {};

import reducer from "../Reducers/indexReducer";

storeHistory.history = createHistory();
const middleware = routerMiddleware(storeHistory.history);

storeHistory.store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            // logger,
            middleware            
        )
    )
)

export default storeHistory;



