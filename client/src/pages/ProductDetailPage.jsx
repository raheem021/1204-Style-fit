import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/api/products/${id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return false;
    }

    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    return true;
  };

  const handleBuyNow = () => {
    const ok = handleAddToCart();
    if (ok) navigate("/cart");
  };

  if (!product) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#999" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 768px) {
          .product-detail-container {
            padding: 1.5rem 1rem !important;
          }

          .product-detail-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }

          .product-main-image {
            height: auto !important;
            max-height: 430px !important;
          }

          .product-thumbnails {
            overflow-x: auto !important;
            padding-bottom: 0.5rem !important;
          }

          .product-info {
            position: static !important;
          }

          .product-title {
            font-size: 2rem !important;
          }

          .product-price {
            font-size: 1.6rem !important;
          }

          .size-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.4rem !important;
          }

          .product-button {
            letter-spacing: 2px !important;
          }
        }
      `}</style>

      <div
        className="product-detail-container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <p
          style={{
            color: "#999",
            fontSize: "0.8rem",
            letterSpacing: "1px",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </span>{" "}
          /{" "}
          <span onClick={() => navigate("/products")} style={{ cursor: "pointer" }}>
            Shop
          </span>{" "}
          / <span style={{ color: "#111", fontWeight: "600" }}>{product.name}</span>
        </p>

        <div
          className="product-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "1rem" }}>
              <img
                className="product-main-image"
                src={product.images?.[activeImg]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "560px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {product.images?.length > 1 && (
              <div className="product-thumbnails" style={{ display: "flex", gap: "0.75rem" }}>
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border: activeImg === i ? "2px solid #111" : "2px solid transparent",
                      opacity: activeImg === i ? 1 : 0.6,
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info" style={{ position: "sticky", top: "2rem" }}>
            <p
              style={{
                color: "#f0c040",
                fontSize: "0.75rem",
                fontWeight: "800",
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {product.category}
            </p>

            <h1
              className="product-title"
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                letterSpacing: "-1px",
                margin: "0 0 1rem",
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            <p
              className="product-price"
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                margin: "0 0 1.5rem",
              }}
            >
              ${product.price}
            </p>

            <div
              style={{
                width: "40px",
                height: "3px",
                background: "#f0c040",
                marginBottom: "1.5rem",
              }}
            />

            <p
              style={{
                color: "#666",
                lineHeight: 1.8,
                marginBottom: "2rem",
                fontSize: "0.95rem",
              }}
            >
              {product.description}
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div
                className="size-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Select Size
                </p>

                <p style={{ color: "#999", fontSize: "0.8rem", cursor: "pointer", margin: 0 }}>
                  Size Guide
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "0.75rem 1.25rem",
                      border: selectedSize === size ? "2px solid #111" : "1px solid #ddd",
                      background: selectedSize === size ? "#111" : "#fff",
                      color: selectedSize === size ? "#fff" : "#111",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      borderRadius: "2px",
                      transition: "all 0.2s",
                      letterSpacing: "1px",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="product-button"
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "1.25rem",
                background: added ? "#2a9d2a" : "#111",
                color: "#fff",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: "800",
                letterSpacing: "3px",
                borderRadius: "2px",
                transition: "background 0.3s",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            <button
              className="product-button"
              onClick={handleBuyNow}
              style={{
                width: "100%",
                padding: "1.25rem",
                background: "#fff",
                color: "#111",
                border: "2px solid #111",
                fontSize: "0.9rem",
                fontWeight: "800",
                letterSpacing: "3px",
                borderRadius: "2px",
                textTransform: "uppercase",
              }}
            >
              Buy Now
            </button>

            <p
              style={{
                color: product.stock > 10 ? "#2a9d2a" : "#e07000",
                fontSize: "0.85rem",
                fontWeight: "600",
                marginTop: "1rem",
              }}
            >
              {product.stock > 10
                ? `✓ In Stock (${product.stock} available)`
                : product.stock > 0
                ? `⚠ Only ${product.stock} left!`
                : "✗ Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}