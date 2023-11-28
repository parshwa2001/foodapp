import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { store } from "../src/redux/Store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>

);

