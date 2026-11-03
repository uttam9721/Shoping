import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decQty, decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const handleDec = decQty || decreaseQty;

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
        <thead>
          <tr style={{ color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", textAlign: "left" }}>
            <th style={{ padding: "0.75rem" }}>Item</th>
            <th style={{ padding: "0.75rem" }}>Title</th>
            <th style={{ padding: "0.75rem" }}>Price</th>
            <th style={{ padding: "0.75rem", textAlign: "center" }}>Qty</th>
            <th style={{ padding: "0.75rem", textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr
              key={product._id || product.productId}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <td style={{ padding: "0.75rem", width: "60px" }}>
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    background: "#0d1322",
                  }}
                />
              </td>
              <td style={{ padding: "0.75rem", fontWeight: "600", fontSize: "0.95rem" }}>
                {product.title}
              </td>
              <td style={{ padding: "0.75rem", color: "#a5b4fc", fontWeight: "700" }}>
                ₹{formatPrice(product.price)}
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.05)", borderRadius: "var(--radius-full)", padding: "2px 8px" }}>
                  <button
                    onClick={() => handleDec && handleDec(product.productId, 1)}
                    style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem" }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 700, minWidth: "16px" }}>{product.qty}</span>
                  <button
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }
                    style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem" }}
                  >
                    +
                  </button>
                </div>
              </td>
              <td style={{ padding: "0.75rem", textAlign: "right" }}>
                <button
                  onClick={() => {
                    if (window.confirm("Remove item from order?")) {
                      removeFromCart(product.productId);
                    }
                  }}
                  style={{
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    color: "#f87171",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", verticalAlign: "middle" }}>
                    delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mini Summary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0.5rem", marginTop: "1rem", borderTop: "1px solid var(--border-glass)" }}>
        <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Total Qty: <strong style={{ color: "#fff" }}>{qty}</strong>
        </span>
        <span style={{ fontSize: "1.15rem", fontWeight: "800" }}>
          Subtotal: <span style={{ color: "var(--primary)" }}>₹{formatPrice(price)}</span>
        </span>
      </div>
    </div>
  );
};

export default TableProduct;