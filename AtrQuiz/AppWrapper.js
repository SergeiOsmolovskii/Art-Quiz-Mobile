import React from 'react'
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import './i18n';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}