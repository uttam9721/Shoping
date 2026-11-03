import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import FilterDropdown from "./FilterDropdown";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, cart, user, token } = useContext(AppContext);

  const filterbyCategory = (cat) => {
    if (!cat || cat.toLowerCase() === "all") {
      setFilteredData(products);
    } else {
      setFilteredData(
        products.filter(
          (data) => data.category?.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/");
    }
    setSearchTerm("");
  };

  const totalCartCount = cart?.items?.reduce((total, item) => total + (item.qty || 1), 0) || 0;

  return (
    <header className="nav-wrapper">
      <div className="nav_bar">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <span className="logo-icon">
            <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
              shopping_bag
            </span>
          </span>
          <span>Shopkart</span>
        </Link>

        {/* Search Bar */}
        <form className="search_bar" onSubmit={submitHandler}>
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Search phones, laptops, audio..."
          />
        </form>

        {/* Category Dropdown (Only on home) */}
        {location.pathname === "/" && (
          <FilterDropdown
            products={products}
            setFilteredData={setFilteredData}
            filterbyCategory={filterbyCategory}
          />
        )}

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Cart Icon Button */}
          <Link to="/cart" className="cart-nav-btn" title="View Shopping Cart">
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalCartCount > 0 && (
              <span className="cart-badge">{totalCartCount}</span>
            )}
          </Link>

          {isAuthenticated && token ? (
            <>
              <Link to="/profile" className="user-avatar-pill" title={`Profile: ${user?.name || 'User'}`}>
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </Link>
              <button
                className="btn-secondary-glass"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  logout
                </span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary-glass">
                Login
              </Link>
              <Link to="/register" className="btn-primary-gradient">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
