import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import RouterCustom from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '20px',
  transition: transitions.SCALE,
  containerStyle: {
    textAlign: 'center',
    fontSize: '14px'
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RouterCustom />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </AlertProvider>
);
