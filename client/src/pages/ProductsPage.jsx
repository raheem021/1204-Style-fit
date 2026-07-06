import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const CATEGORIES = ["All", "T-Shirts", "Hoodies", "Pants", "Accessories"];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then(({ data }) => {
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const filterCategory = (cat) => {
    setActiveCategory(cat);
    setFiltered(cat === "All" ? products : products.filter((p) => p.category === cat));
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 768px) {
          .products-header {
            padding: 4rem 1rem 2.5rem !important;
          }

          .products-filter {
            padding: 0 1rem !important;
          }

          .products-count {
            display: none !important;
          }

          .products-grid-wrap {
            padding: 2rem 1rem !important;
          }

          .products-grid {
            grid-template-columns: 1fr !important;
          }

          .product-img {
            height: 300px !important;
          }

          .product-info-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.4rem !important;
          }
        }
      `}</style>

      <div
        className="products-header"
        style={{
          background: "#111",
          color: "#fff",
          padding: "5rem 4rem 3rem",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "#f0c040", letterSpacing: "5px", fontSize: "0.75rem", fontWeight: "700", marginBottom: "0.75rem" }}>
            1204 FIT AND LIFESTYLE
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "900", letterSpacing: "-1px", margin: 0 }}>
            The Collection
          </h1>
        </div>
      </div>

      <div
        className="products-filter"
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
          padding: "0 4rem",
          display: "flex",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => filterCategory(cat)}
            style={{
              padding: "1.25rem 1.75rem",
              border: "none",
              background: "none",
              fontWeight: "700",
              fontSize: "0.8rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: activeCategory === cat ? "#111" : "#999",
              borderBottom: activeCategory === cat ? "2px solid #f0c040" : "2px solid transparent",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {cat}
          </button>
        ))}

        <span
          className="products-count"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            color: "#999",
            fontSize: "0.8rem",
            paddingRight: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} items
        </span>
      </div>

      <div className="products-grid-wrap" style={{ padding: "3rem 4rem", maxWidth: "1400px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#999" }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#999" }}>
            No products in this category yet.
          </div>
        ) : (
          <div
            className="products-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                style={{ textDecoration: "none", color: "inherit" }}
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "6px",
                    overflow: "hidden",
                    boxShadow:
                      hoveredId === product._id
                        ? "0 20px 60px rgba(0,0,0,0.12)"
                        : "0 2px 16px rgba(0,0,0,0.06)",
                    transform: hoveredId === product._id ? "translateY(-6px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      className="product-img"
                      src={product.images?.[0]}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "340px",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                        transform: hoveredId === product._id ? "scale(1.06)" : "scale(1)",
                      }}
                    />

                    {product.isFeatured && (
                      <span
                        style={{
                          position: "absolute",
                          top: "1rem",
                          left: "1rem",
                          background: "#f0c040",
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.65rem",
                          fontWeight: "800",
                          letterSpacing: "2px",
                        }}
                      >
                        FEATURED
                      </span>
                    )}

                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "#111",
                        color: "#fff",
                        padding: "0.9rem",
                        textAlign: "center",
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        letterSpacing: "3px",
                        opacity: hoveredId === product._id ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      VIEW PRODUCT →
                    </div>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.7rem", color: "#999", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 0.4rem" }}>
                      {product.category}
                    </p>

                    <div
                      className="product-info-row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "700" }}>
                        {product.name}
                      </h3>
                      <p style={{ margin: 0, fontWeight: "800", fontSize: "1.05rem", whiteSpace: "nowrap" }}>
                        ${product.price}
                      </p>
                    </div>

                    <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          style={{
                            border: "1px solid #ddd",
                            padding: "0.2rem 0.5rem",
                            fontSize: "0.65rem",
                            fontWeight: "600",
                            letterSpacing: "1px",
                            borderRadius: "2px",
                          }}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}