import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store, { Persistor } from './redux/store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PersistGate } from 'redux-persist/integration/react'
import { UIProvider } from './utils/UIContext.jsx'

//http://localhost:8080
//https://api.ayagimagelsin.com.tr
const local = "http://localhost:8080";
const product = "https://api.ayagimagelsin.tr";

if (process.env.NODE_ENV !== 'production')
  axios.defaults.baseURL = product;
else
  axios.defaults.baseURL = product;

axios.defaults.headers.post['Content-Type'] = 'application/json';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <GoogleOAuthProvider clientId='711966364839-742q3cumeeg14lalepnlsavb1cup74i6.apps.googleusercontent.com'>
          <UIProvider>
            <App />
          </UIProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
