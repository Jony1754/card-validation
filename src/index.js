import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import './scss/main.scss';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Transactions from './pages/Transactions';
import ErrorPage from './pages/ErrorPage';
import Cards from './pages/Cards';
import Scheduled from './pages/Scheduled';
import Layout from './components/Layout';
import Profile from './pages/Profile';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/scheduled' element={<Scheduled />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<div></div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
