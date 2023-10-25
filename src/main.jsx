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

//axios.defaults.baseURL = 'https://api.ayagimagelsin.com.tr';
/*if (process.env.NODE_ENV !== 'production')
  axios.defaults.baseURL = 'http://localhost:8080';
else*/
axios.defaults.baseURL = 'https://api.ayagimagelsin.com.tr';

axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <GoogleOAuthProvider clientId='711966364839-742q3cumeeg14lalepnlsavb1cup74i6.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
