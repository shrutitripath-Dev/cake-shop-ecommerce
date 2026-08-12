import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Info.jsx";

export default function Navbar({ showCart, setShowCart }={}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowMenu(false);
    navigate("/")
  };
  return (
    <header className="navbar">
      <div className="navbar-logo">🍰 Cake Shop</div>
      <nav className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/wish">Wish List</a>
        <a href="/orders">Order History</a>

        {user ? (<div className="accountExi">
          <button className='accBut' onClick={() => navigate("/me")}>
            <img src='/img/me.png' alt='Acc img' />
          </button>

        </div>) : (
          <button className="loginB" onClick={() => navigate("/mylogin")}>
            <img src='/img/log.png' alt='log img' />
          </button>
        )}

        <button className="cartB" onClick={() => navigate("/mycart")}>
          <img src='/img/cart.png' alt='cartImpg' />
        </button>

      </nav>
    </header>

  );
};


