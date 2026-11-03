import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";
import RelatedProduct from "./RelatedProduct";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart, url } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, url]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price || 0);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(
        product._id,
        product.title,
        product.price,
        1,
        product.imgSrc
      );
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="empty-state" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <span className="material-symbols-outlined empty-icon" style={{ animation: "spin 1.5s linear infinite" }}>
          sync
        </span>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <h3>Loading Product Details...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="empty-state" style={{ minHeight: "60vh" }}>
        <span className="material-symbols-outlined empty-icon" style={{ color: "#ef4444" }}>
          error
        </span>
        <h2>{error || "Product Not Found"}</h2>
        <p className="mt-2">The product you are looking for does not exist or was removed.</p>
        <Link to="/" className="btn-primary-gradient mt-4">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      {/* Breadcrumb / Back Link */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link to="/" className="btn-secondary-glass" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            arrow_back
          </span>
          Back to Catalog
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="details-grid">
        {/* Left: Product Image */}
        <div className="details-img-wrap">
          <img src={product.imgSrc} alt={product.title} />
        </div>

        {/* Right: Info */}
        <div className="details-info">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>
          <p className="details-desc">{product.description}</p>

          <div className="details-price">
            <span>₹</span>
            {formatPrice(product.price)}
          </div>

          {/* Key Specs / Highlights */}
          <div className="details-features-list">
            <div className="details-feature-item">
              <span className="material-symbols-outlined">local_shipping</span>
              <span>Express Delivery in 24-48h</span>
            </div>
            <div className="details-feature-item">
              <span className="material-symbols-outlined">verified</span>
              <span>Brand New & 100% Original</span>
            </div>
            <div className="details-feature-item">
              <span className="material-symbols-outlined">published_with_changes</span>
              <span>7 Days Return Guarantee</span>
            </div>
            <div className="details-feature-item">
              <span className="material-symbols-outlined">lock</span>
              <span>Encrypted Secure Checkout</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="details-action-buttons">
            <button
              className="btn-primary-gradient"
              style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}
              onClick={handleBuyNow}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                shopping_bag
              </span>
              Buy Now
            </button>
            <button
              className="btn-card-cart"
              style={{ padding: "0.85rem 1.75rem", fontSize: "1rem", borderRadius: "9999px" }}
              onClick={() =>
                addToCart(
                  product._id,
                  product.title,
                  product.price,
                  1,
                  product.imgSrc
                )
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                add_shopping_cart
              </span>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      <div style={{ marginTop: "4rem" }}>
        <RelatedProduct category={product?.category} currentProductId={product?._id} />
      </div>
    </div>
  );
};

export default ProductDetails;