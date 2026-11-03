import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (products && term) {
      const decodedTerm = decodeURIComponent(term).toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.title?.toLowerCase().includes(decodedTerm) ||
          product.description?.toLowerCase().includes(decodedTerm) ||
          product.category?.toLowerCase().includes(decodedTerm)
      );
      setSearchProduct(filtered);
    } else {
      setSearchProduct(products || []);
    }
  }, [term, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price || 0);
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

  return (
    <div className="home-container" style={{ padding: "2rem 1.5rem 4rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Search Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <Link to="/" className="btn-secondary-glass" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            arrow_back
          </span>
          All Products
        </Link>
        <h1 style={{ fontSize: "2rem", marginTop: "1rem" }}>
          Search Results for: <span style={{ color: "var(--primary)" }}>"{term}"</span>
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.25rem" }}>
          Found {searchProduct.length} {searchProduct.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Grid */}
      {searchProduct.length > 0 ? (
        <div className="product-grid" style={{ padding: "0" }}>
          {searchProduct.map((product) => (
            <div key={product._id} className="modern-product-card">
              <div className="card-img-wrap">
                <Link to={`/product/${product._id}`} style={{ width: "100%", height: "100%" }}>
                  <img src={product.imgSrc} alt={product.title} loading="lazy" />
                </Link>
                <span className="card-category-badge">{product.category}</span>
                <span className="card-stock-badge">In Stock</span>
              </div>

              <div className="card-content">
                <Link to={`/product/${product._id}`}>
                  <h3 className="card-product-title" title={product.title}>
                    {product.title}
                  </h3>
                </Link>
                <p className="card-product-desc">{product.description}</p>

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
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="material-symbols-outlined empty-icon">search_off</span>
          <h2>No matching products found</h2>
          <p>We couldn't find anything matching "{term}". Try checking for spelling errors or searching general terms.</p>
          <Link to="/" className="btn-primary-gradient mt-4">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
