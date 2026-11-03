import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category, currentProductId }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (products && category) {
      const filtered = products.filter(
        (p) =>
          p.category?.toLowerCase() === category?.toLowerCase() &&
          p._id !== currentProductId
      );
      setRelatedProduct(filtered);
    }
  }, [category, products, currentProductId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price || 0);
  };

  if (!relatedProduct || relatedProduct.length === 0) {
    return null;
  }

  return (
    <section className="related-products-section">
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>
          You May Also Like
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Similar items in {category} curated for you
        </p>
      </div>

      <div className="product-grid" style={{ padding: "0" }}>
        {relatedProduct.map((product) => (
          <div key={product._id} className="modern-product-card">
            <div className="card-img-wrap">
              <Link to={`/product/${product._id}`} style={{ width: "100%", height: "100%" }}>
                <img src={product.imgSrc} alt={product.title} loading="lazy" />
              </Link>
              <span className="card-category-badge">{product.category}</span>
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
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;