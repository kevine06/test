import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.action.js';
import { getPosts } from './actions/post.action.js';
// import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },
});


store.dispatch(getUsers())
store.dispatch(getPosts())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
