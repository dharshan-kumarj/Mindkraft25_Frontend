// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src="src/  assets/karunyalogo.webp" alt="Left Logo" />
      <h1 className="header-title">MINDKRAFT 2K25</h1>
      <button className="view-cart-button" onClick={() => window.location.href = 'cart.html'}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
};

export default Header;