import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Products from './Products';
import Forums from './Forums';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <BrowserRouter>
        <NavLink activeClassName="active" className="links" to="/products">
          Products
        </NavLink>
        <NavLink activeClassName="active" className="links" to="/forums">
          Forums
        </NavLink>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/forums" element={<Forums />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
