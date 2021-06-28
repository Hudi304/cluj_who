import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers , applyMiddleware} from "redux";
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { AccountReducer } from './pages/account/account.reducer';
import { LoginReducer } from './pages/login/login.reducer';
import loginSaga from './pages/login/login.saga';

import { rootSaga } from "./saga"

const sagaMiddleware = createSagaMiddleware()

const allReducers = combineReducers({
  login: LoginReducer,
  accounts: AccountReducer
})

export const store = createStore(allReducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();