import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProducts from './pages/listProducts';
import Product from './pages/product';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ListProducts />} />
          <Route path="/product/:category/:productId" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;