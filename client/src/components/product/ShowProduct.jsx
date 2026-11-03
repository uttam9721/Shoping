import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  { id: "all", label: "All Items", icon: "grid_view" },
  { id: "mobiles", label: "Smartphones", icon: "smartphone" },
  { id: "laptop", label: "Laptops", icon: "laptop_mac" },
  { id: "cameras", label: "Cameras", icon: "photo_camera" },
  { id: "headphones", label: "Audio", icon: "headphones" },
];

const ShowProduct = () => {
  const { products, filteredData, setFilteredData, addToCart } = useContext(AppContext);
  const [selectedCat, setSelectedCat] = useState("all");
  const navigate = useNavigate();

  const handleCategoryClick = (catId) => {
    setSelectedCat(catId);
    if (catId === "all") {
      setFilteredData(products);
    } else {
      setFilteredData(
        products?.filter(
          (p) => p.category?.toLowerCase() === catId.toLowerCase()
        )
      );
    }
  };

  const handleBuyNow = (product) => {
    addToCart(
      product._id,
      product.title,
      product.price,
      1,
      product.imgSrc
    );
    navigate("/cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price || 0);
  };

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-badge">
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            bolt
          </span>
          Next-Gen Tech Deals & Premium Gadgets
        </div>
        <h1 className="hero-title">
          Experience Next-Level <br />
          <span className="gradient-text">Performance & Style</span>
        </h1>
        <p className="hero-subtitle">
          Curated collection of flagship smartphones, creator laptops, pro cameras, and studio-grade audio engineered for the future.
        </p>

        {/* Category Pills Bar */}
        <div className="category-pills-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`category-pill ${selectedCat === cat.id ? "active" : ""}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="trust-bar">
          <div className="trust-item">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Free Express Delivery</span>
          </div>
          <div className="trust-item">
            <span className="material-symbols-outlined">verified</span>
            <span>100% Genuine Products</span>
          </div>
          <div className="trust-item">
            <span className="material-symbols-outlined">shield_with_heart</span>
            <span>1-Year Official Warranty</span>
          </div>
          <div className="trust-item">
            <span className="material-symbols-outlined">support_agent</span>
            <span>24/7 Premium Support</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div key={product._id} className="modern-product-card">
              {/* Product Image & Badges */}
              <div className="card-img-wrap">
                <Link to={`/product/${product._id}`} style={{ width: "100%", height: "100%" }}>
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    loading="lazy"
                  />
                </Link>
                <span className="card-category-badge">{product.category}</span>
                <span className="card-stock-badge">In Stock</span>
              </div>

              {/* Product Info */}
              <div className="card-content">
                <Link to={`/product/${product._id}`}>
                  <h3 className="card-product-title" title={product.title}>
                    {product.title}
                  </h3>
                </Link>
                <p className="card-product-desc">{product.description}</p>

                {/* Footer Price & Buttons */}
                <div className="card-footer-action">
                  <div className="card-price">
                    <span>₹</span>
                    {formatPrice(product.price)}
                  </div>
                  <div className="card-btn-group">
                    <button
                      className="btn-card-cart"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                      title="Add to cart"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        add_shopping_cart
                      </span>
                    </button>
                    <button
                      className="btn-card-buy"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
            <span className="material-symbols-outlined empty-icon">inventory_2</span>
            <h3>No products found</h3>
            <p>Try selecting a different category or search term.</p>
            <button
              onClick={() => handleCategoryClick("all")}
              className="btn-primary-gradient mt-3"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
