import React from 'react';
import { BrowserRouter, Route, Routes, Switch, Router } from 'react-router-dom';
import CardValidation from '../pages/CardValidation';
import Home from '../pages/Home';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CardValidation />} />
        {/* <Route path='/cardvalidation' component={CardValidation} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
