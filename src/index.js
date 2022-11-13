import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import './scss/main.scss';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{ path: '/', element: <App /> }]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
