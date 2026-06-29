import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(({ data }) => setFeatured(data.filter((p) => p.isFeatured)));
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', sans-serif",
        background: "#fafafa",
      }}
    >
      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "0 6rem" }}>
          <p
            style={{
              color: "#f0c040",
              letterSpacing: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
            }}
          >
            NEW COLLECTION — 2026
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              fontWeight: "900",
              lineHeight: "1",
              margin: "0 0 1.5rem",
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            Wear
            <br />
            <span
              style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}
            >
              Your
            </span>
            <br />
            Identity
          </h1>
          <p
            style={{
              color: "#f0c040",
              letterSpacing: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
            }}
          >
            1204 FIT AND LIFESTYLE — 2026
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              fontWeight: "900",
              lineHeight: "1",
              margin: "0 0 1.5rem",
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            Fit For
            <br />
            <span
              style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}
            >
              Every
            </span>
            <br />
            Lifestyle
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.1rem",
              maxWidth: "380px",
              marginBottom: "3rem",
              lineHeight: 1.7,
            }}
          >
            Where Igbalode meets fashion. Elevate your everyday look with 1204
            Fit and Lifestyle.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link
              to="/products"
              style={{
                background: "#f0c040",
                color: "#111",
                padding: "1rem 2.5rem",
                fontWeight: "800",
                letterSpacing: "3px",
                fontSize: "0.85rem",
                textDecoration: "none",
                borderRadius: "2px",
                textTransform: "uppercase",
              }}
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              style={{
                border: "1px solid rgba(255,255,255,0.5)",
                color: "#fff",
                padding: "1rem 2.5rem",
                fontWeight: "600",
                letterSpacing: "3px",
                fontSize: "0.85rem",
                textDecoration: "none",
                borderRadius: "2px",
                textTransform: "uppercase",
              }}
            >
              View Lookbook
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            opacity: 0.5,
            fontSize: "0.75rem",
            letterSpacing: "3px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "60px",
              background: "#fff",
              margin: "0 auto 0.5rem",
            }}
          />
          SCROLL
        </div>
      </div>

      {/* MARQUEE STRIP */}
      {/* MARQUEE STRIP */}
      <style>{`
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`}</style>
      <div
        style={{
          background: "#f0c040",
          padding: "0.9rem 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "marquee 18s linear infinite",
          }}
        >
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "3rem",
                fontSize: "0.8rem",
                fontWeight: "800",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              New Drop ✦ Limited Stock ✦ Free Shipping Over $100 ✦
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div
        style={{ padding: "6rem 4rem", maxWidth: "1400px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
          }}
        >
          <div>
            <p
              style={{
                color: "#f0c040",
                letterSpacing: "4px",
                fontSize: "0.75rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              HAND PICKED
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "900",
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              Featured Pieces
            </h2>
          </div>
          <Link
            to="/products"
            style={{
              color: "#111",
              fontWeight: "700",
              letterSpacing: "2px",
              fontSize: "0.8rem",
              textDecoration: "none",
              borderBottom: "2px solid #111",
              paddingBottom: "2px",
            }}
          >
            VIEW ALL →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {featured.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              style={{ textDecoration: "none", color: "inherit" }}
              onMouseEnter={() => setHoveredId(product._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                style={{
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow:
                    hoveredId === product._id
                      ? "0 20px 60px rgba(0,0,0,0.15)"
                      : "0 2px 20px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  transform:
                    hoveredId === product._id
                      ? "translateY(-8px)"
                      : "translateY(0)",
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "360px",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                      transform:
                        hoveredId === product._id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: "#f0c040",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.7rem",
                      fontWeight: "800",
                      letterSpacing: "2px",
                      borderRadius: "2px",
                    }}
                  >
                    FEATURED
                  </div>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      margin: "0 0 0.4rem",
                    }}
                  >
                    {product.category}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1.1rem",
                        fontWeight: "700",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "800",
                        fontSize: "1.1rem",
                      }}
                    >
                      ${product.price}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "0.7rem",
                      background: "#111",
                      color: "#fff",
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      letterSpacing: "2px",
                      borderRadius: "2px",
                      opacity: hoveredId === product._id ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  >
                    QUICK VIEW →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* BANNER CTA */}
      <div
        style={{
          margin: "0 4rem 6rem",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <p
            style={{
              letterSpacing: "6px",
              fontSize: "0.75rem",
              marginBottom: "1rem",
              opacity: 0.7,
            }}
          >
            LIMITED TIME
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: "900",
              margin: "0 0 1rem",
              letterSpacing: "-1px",
            }}
          >
            Up to 30% Off
            <br />
            Select Styles
          </h2>
          <Link
            to="/products"
            style={{
              background: "#f0c040",
              color: "#111",
              padding: "1rem 3rem",
              fontWeight: "800",
              letterSpacing: "3px",
              fontSize: "0.85rem",
              textDecoration: "none",
              borderRadius: "2px",
              display: "inline-block",
              marginTop: "1rem",
            }}
          >
            SHOP THE SALE
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "#111",
          color: "#fff",
          padding: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: "900",
              letterSpacing: "3px",
              marginBottom: "1rem",
            }}
          >
            1204 Fit & Lifestyle
          </h3>
          <p style={{ color: "#777", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Premium streetwear for the bold. Crafted with purpose.
          </p>
        </div>
        <div>
          <h4
            style={{
              letterSpacing: "3px",
              fontSize: "0.75rem",
              marginBottom: "1rem",
              color: "#f0c040",
            }}
          >
            SHOP
          </h4>
          {["New Arrivals", "T-Shirts", "Hoodies", "Pants", "Accessories"].map(
            (item) => (
              <p
                key={item}
                style={{
                  color: "#777",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
              >
                {item}
              </p>
            ),
          )}
        </div>
        <div>
          <h4
            style={{
              letterSpacing: "3px",
              fontSize: "0.75rem",
              marginBottom: "1rem",
              color: "#f0c040",
            }}
          >
            INFO
          </h4>
          {["About Us", "Shipping", "Returns", "Size Guide", "Contact"].map(
            (item) => (
              <p
                key={item}
                style={{
                  color: "#777",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
              >
                {item}
              </p>
            ),
          )}
        </div>
        <div>
          <h4
            style={{
              letterSpacing: "3px",
              fontSize: "0.75rem",
              marginBottom: "1rem",
              color: "#f0c040",
            }}
          >
            STAY CONNECTED
          </h4>
          <p
            style={{ color: "#777", fontSize: "0.9rem", marginBottom: "1rem" }}
          >
            Get early access to new drops.
          </p>
          <div style={{ display: "flex" }}>
            <input
              placeholder="Your email"
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                background: "#222",
                color: "#fff",
                borderRadius: "2px 0 0 2px",
                outline: "none",
              }}
            />
            <button
              style={{
                background: "#f0c040",
                border: "none",
                padding: "0.75rem 1rem",
                fontWeight: "800",
                cursor: "pointer",
                borderRadius: "0 2px 2px 0",
              }}
            >
              →
            </button>
          </div>
        </div>
        <div
          style={{
            gridColumn: "1/-1",
            borderTop: "1px solid #222",
            paddingTop: "2rem",
            color: "#555",
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          © 2026 1204 Fit & Lifestyle. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
