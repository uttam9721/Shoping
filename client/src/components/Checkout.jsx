import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let q = 0;
    let p = 0;
    if (cart?.items) {
      cart.items.forEach((item) => {
        q += item.qty;
        p += item.price;
      });
    }
    setPrice(p);
    setQty(q);
  }, [cart]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat("en-IN").format(val || 0);
  };

  const handlePayment = async () => {
    try {
      setProcessing(true);
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user?._id,
      });

      const { orderId, amount: orderAmount } = orderRepons.data;

      const options = {
        key: "rzp_test_gHH711O4gcSjCq",
        amount: orderAmount * 100,
        currency: "INR",
        name: "Shopkart",
        description: "Order Checkout Payment",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user?._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        },
        prefill: {
          name: userAddress?.fullName || user?.name || "Customer",
          email: user?.email || "customer@example.com",
          contact: userAddress?.phoneNumber || "9876543210",
        },
        theme: {
          color: "#6366f1",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK is loading or not available. In demo mode, simulated success.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert(error.response?.data?.message || "Payment service error or order creation failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "3rem auto", padding: "0 1.5rem" }}>
      {/* Checkout Steps Progress */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--success)", fontWeight: "600" }}>
          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
            ✓
          </span>
          <span>Shipping Details</span>
        </div>
        <div style={{ width: "40px", height: "2px", background: "var(--primary)" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: "700" }}>
          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
            2
          </span>
          <span>Review & Pay</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
        {/* Left: Product Table Card */}
        <div className="cart-items-card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "1.25rem" }}>Order Items</h2>
          <TableProduct cart={cart} />
        </div>

        {/* Right: Shipping Address & Payment Card */}
        <div className="summary-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.3rem", margin: 0 }}>Delivery Address</h3>
            <Link to="/shipping" style={{ fontSize: "0.85rem", color: "#a5b4fc", textDecoration: "underline" }}>
              Edit
            </Link>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border-glass)",
              borderRadius: "var(--radius-md)",
              padding: "1rem",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>
              {userAddress?.fullName || "Name Not Specified"}
            </div>
            <div style={{ color: "var(--text-muted)" }}>{userAddress?.address}</div>
            <div style={{ color: "var(--text-muted)" }}>
              {userAddress?.city}, {userAddress?.state} - {userAddress?.pincode}
            </div>
            <div style={{ color: "var(--text-muted)" }}>{userAddress?.country}</div>
            <div style={{ marginTop: "0.5rem", color: "#a5b4fc", fontWeight: 600 }}>
              📞 {userAddress?.phoneNumber}
            </div>
          </div>

          <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Payment Details</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{formatPrice(price)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: "#34d399", fontWeight: 600 }}>FREE</span>
          </div>
          <div className="summary-row total-row">
            <span>Amount to Pay</span>
            <span>₹{formatPrice(price)}</span>
          </div>

          <button
            className="btn-primary-gradient"
            style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "1.5rem", fontSize: "1.05rem" }}
            onClick={handlePayment}
            disabled={processing || !cart?.items?.length}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              lock
            </span>
            {processing ? "Initiating Payment..." : `Pay ₹${formatPrice(price)} Now`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;