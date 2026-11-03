import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, cart } = useContext(AppContext);
  const navigate = useNavigate();

  const totalCartCount = cart?.items?.reduce((total, item) => total + (item.qty || 1), 0) || 0;

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem" }}>
      <div className="profile-card">
        <div className="profile-avatar-large">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <h2 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{user?.name || "Member"}</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>{user?.email || "No email"}</p>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-glass)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "24px" }}>
              shopping_bag
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "0.5rem" }}>
              {totalCartCount}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Items in Cart</div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-glass)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "var(--success)", fontSize: "24px" }}>
              verified_user
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "0.5rem" }}>
              Active
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Account Status</div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-glass)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "var(--accent)", fontSize: "24px" }}>
              loyalty
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "0.5rem" }}>
              VIP
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Membership Tier</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/" className="btn-primary-gradient">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              storefront
            </span>
            Continue Shopping
          </Link>

          <Link to="/cart" className="btn-secondary-glass">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              shopping_cart
            </span>
            View Cart
          </Link>

          <button
            className="btn-secondary-glass"
            style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }}
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              logout
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
