import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Info.jsx";

export default function Navbar({ showCart, setShowCart } = {}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowMenu(false);
    navigate("/")
  };

  const goTo = (path) => {
    navigate(path);
    setShowMenu(false); // link click karte hi menu band ho jaye mobile pe
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">🍰 Cake Shop</div>

      {/* Hamburger button — sirf mobile pe dikhega (CSS se control) */}
      <button
        className="navbar-toggle"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle menu"
      >
        {showMenu ? "✕" : "☰"}
      </button>

      <nav className={`navbar-links ${showMenu ? "open" : ""}`}>
        <a href="/" onClick={(e) => { e.preventDefault(); goTo("/"); }}>Home</a>
        <a href="/about" onClick={(e) => { e.preventDefault(); goTo("/about"); }}>About</a>
        <a href="/wish" onClick={(e) => { e.preventDefault(); goTo("/wish"); }}>Wish List</a>
        <a href="/orders" onClick={(e) => { e.preventDefault(); goTo("/orders"); }}>Order History</a>

        {user ? (
          <div className="accountExi">
            <button className='accBut' onClick={() => goTo("/me")}>
              <img src='/img/me.png' alt='Acc img' />
            </button>
          </div>
        ) : (
          <button className="loginB" onClick={() => goTo("/mylogin")}>
            <img src='/img/log.png' alt='log img' />
          </button>
        )}

        <button className="cartB" onClick={() => goTo("/mycart")}>
          <img src='/img/cart.png' alt='cartImpg' />
        </button>
      </nav>
    </header>
  );
};