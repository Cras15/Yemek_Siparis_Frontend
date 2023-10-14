import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

//axios.defaults.baseURL = 'http://api.ayagimagelsin.com.tr';
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (localStorage.getItem('token')) {
  axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
