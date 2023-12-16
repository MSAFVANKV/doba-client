import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { Provider } from 'react-redux'
import Store from './ReduxToolKit/Store.jsx'
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={Store}>
        <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
