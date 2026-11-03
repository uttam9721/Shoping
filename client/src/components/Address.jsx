import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result && result.success) {
      navigate("/checkout");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem" }}>
      {/* Checkout Steps Progress */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: "700" }}>
          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
            1
          </span>
          <span>Shipping Details</span>
        </div>
        <div style={{ width: "40px", height: "2px", background: "var(--border-glass)" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-dim)", fontWeight: "600" }}>
          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", color: "var(--text-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
            2
          </span>
          <span>Payment & Review</span>
        </div>
      </div>

      <div className="cart-items-card" style={{ padding: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}>Shipping Address</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Enter delivery destination for your order
            </p>
          </div>
          {userAddress && (
            <button
              type="button"
              className="btn-secondary-glass"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", borderColor: "var(--primary)", color: "#c7d2fe" }}
              onClick={() => navigate("/checkout")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                history
              </span>
              Use Saved Address
            </button>
          )}
        </div>

        <form onSubmit={submitHandler}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <div className="form-group-modern" style={{ margin: 0 }}>
              <label>Full Name</label>
              <input
                name="fullName"
                value={fullName}
                onChange={onChangeHandler}
                type="text"
                required
                className="modern-input"
                style={{ paddingLeft: "1rem" }}
                placeholder="Uttam Maurya"
              />
            </div>

            <div className="form-group-modern" style={{ margin: 0 }}>
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeHandler}
                type="tel"
                required
                className="modern-input"
                style={{ paddingLeft: "1rem" }}
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label>Street Address / Flat / Landmark</label>
            <textarea
              name="address"
              value={address}
              onChange={onChangeHandler}
              rows="3"
              required
              className="modern-input"
              style={{ paddingLeft: "1rem", height: "auto" }}
              placeholder="House/Apartment #, Street, Landmark"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem", marginBottom: "2rem" }}>
            <div className="form-group-modern" style={{ margin: 0 }}>
              <label>City</label>
              <input
                name="city"
                value={city}
                onChange={onChangeHandler}
                type="text"
                required
                className="modern-input"
                style={{ paddingLeft: "1rem" }}
                placeholder="Mumbai"
              />
            </div>

            <div className="form-group-modern" style={{ margin: 0 }}>
              <label>State</label>
              <input
                name="state"
                value={state}
                onChange={onChangeHandler}
                type="text"
                required
                className="modern-input"
                style={{ paddingLeft: "1rem" }}
                placeholder="Maharashtra"
              />
            </div>

            <div className="form-group-modern" style={{ margin: 0 }}>
              <label>PIN Code</label>
              <input
                name="pincode"
                value={pincode}
                onChange={onChangeHandler}
                type="text"
                required
                className="modern-input"
                style={{ paddingLeft: "1rem" }}
                placeholder="400001"
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/cart" className="btn-secondary-glass">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_back
              </span>
              Back to Cart
            </Link>

            <button type="submit" className="btn-primary-gradient" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
              Continue to Payment
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;