import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const { cart, decQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;

    if (cart?.items) {
      cart.items.forEach((item) => {
        totalQty += item.qty;
        totalPrice += item.price;
      });
      setPrice(totalPrice);
      setQty(totalQty);
    }
  }, [cart]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat("en-IN").format(val || 0);
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="empty-state" style={{ background: "var(--bg-card)", border: "1px solid var(--border-glass)", borderRadius: "var(--radius-lg)", padding: "4rem 2rem" }}>
          <span className="material-symbols-outlined empty-icon" style={{ fontSize: "5rem", color: "var(--primary)" }}>
            shopping_bag
          </span>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Your Cart is Empty</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto 2rem" }}>
            Looks like you haven't added any products to your cart yet. Explore our latest electronics and deals!
          </p>
          <Link to="/" className="btn-primary-gradient" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.4rem" }}>Shopping Cart</h1>
        <p style={{ color: "var(--text-muted)" }}>
          You have <strong style={{ color: "#fff" }}>{qty} items</strong> in your shopping cart
        </p>
      </div>

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <div className="cart-items-card">
          {cart.items.map((item) => (
            <div key={item._id || item.productId} className="cart-item-row">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="cart-item-img"
              />

              <div className="cart-item-info">
                <h4 className="cart-item-title">{item.title}</h4>
                <div className="cart-item-price">
                  ₹{formatPrice(item.price)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="cart-qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => decQty(item.productId, 1)}
                  title="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-val">{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() =>
                    addToCart(
                      item.productId,
                      item.title,
                      item.price / item.qty,
                      1,
                      item.imgSrc
                    )
                  }
                  title="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="btn-remove-item"
                title="Remove item"
                onClick={() => {
                  if (window.confirm("Remove this item from your cart?")) {
                    removeFromCart(item.productId);
                  }
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  delete_outline
                </span>
              </button>
            </div>
          ))}

          {/* Action Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Link to="/" className="btn-secondary-glass" style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_back
              </span>
              Continue Shopping
            </Link>

            <button
              className="btn-secondary-glass"
              style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.2)", fontSize: "0.85rem", padding: "0.45rem 1rem" }}
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your entire cart?")) {
                  clearCart();
                }
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                remove_shopping_cart
              </span>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="summary-box">
          <h3 style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}>Order Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span style={{ fontWeight: 600, color: "#fff" }}>{qty}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span style={{ fontWeight: 600, color: "#fff" }}>₹{formatPrice(price)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span style={{ color: "#34d399", fontWeight: 600 }}>FREE</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax</span>
            <span style={{ color: "#94a3b8" }}>Included</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{formatPrice(price)}</span>
          </div>

          <button
            className="btn-primary-gradient"
            style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "1.5rem", fontSize: "1rem" }}
            onClick={() => navigate("/shipping")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              lock
            </span>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
