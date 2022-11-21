import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Login } from '../pages/Login';
import { useState, useEffect, useContext, createContext } from 'react';

const Layout = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (isLogged) {
      document.body.classList.remove('body');
    }
  }, [isLogged]);

  if (!isLogged) {
    return (
      <>
        <Login setIsLogged={setIsLogged} setValidUser />
      </>
    );
  } else {
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

export default Layout;
