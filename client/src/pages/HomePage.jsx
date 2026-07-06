import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setFeatured(data.filter((p) => p.isFeatured));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif", background: "#fafafa", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh !important;
            height: auto !important;
            padding: 3rem 1rem 3rem !important;
            align-items: flex-start !important;
          }

          .hero-content {
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }

          .hero-title {
            font-size: clamp(2.5rem, 13vw, 2.8rem) !important;
            line-height: 0.95 !important;
            letter-spacing: -1px !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
          }

          .hero-small-text {
            font-size: 0.65rem !important;
            letter-spacing: 5px !important;
            line-height: 1.8 !important;
            max-width: 100% !important;
          }

          .hero-description {
            font-size: 1rem !important;
            max-width: 100% !important;
            margin-bottom: 2rem !important;
          }

          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }

          .hero-buttons a {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }

          .featured-section {
            padding: 4rem 1.2rem !important;
          }

          .featured-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
          }

          .banner-section {
            margin: 0 1.2rem 4rem !important;
            min-height: 320px !important;
            padding: 2rem 1rem !important;
          }

          .site-footer {
            padding: 3rem 1.2rem !important;
          }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* HERO */}
      <div
        className="hero-section"
        style={{
          position: "relative",
          height: "100vh",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
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

        <div className="hero-content" style={{ position: "relative", zIndex: 1, padding: "0 6rem" }}>
          <p className="hero-small-text" style={{ color: "#f0c040", letterSpacing: "6px", fontSize: "0.75rem", fontWeight: "600", marginBottom: "1.5rem" }}>
            NEW COLLECTION — 2026
          </p>

          <h1 className="hero-title" style={{ color: "#fff", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: "900", lineHeight: "1", margin: "0 0 1.5rem", letterSpacing: "-2px", textTransform: "uppercase" }}>
            Wear
            <br />
            <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>
              Your
            </span>
            <br />
            Identity
          </h1>

          <p className="hero-small-text" style={{ color: "#f0c040", letterSpacing: "6px", fontSize: "0.75rem", fontWeight: "600", marginBottom: "1.5rem" }}>
            1204 FIT AND LIFESTYLE — 2026
          </p>

          <h1 className="hero-title" style={{ color: "#fff", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: "900", lineHeight: "1", margin: "0 0 1.5rem", letterSpacing: "-2px", textTransform: "uppercase" }}>
            Fit For
            <br />
            <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>
              Every
            </span>
            <br />
            Lifestyle
          </h1>

          <p className="hero-description" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "380px", marginBottom: "3rem", lineHeight: 1.7 }}>
            Where Igbalode meets fashion. Elevate your everyday look with 1204 Fit and Lifestyle.
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: "1rem" }}>
            <Link to="/products" style={{ background: "#f0c040", color: "#111", padding: "1rem 2.5rem", fontWeight: "800", letterSpacing: "3px", fontSize: "0.85rem", textDecoration: "none", borderRadius: "2px", textTransform: "uppercase" }}>
              Shop Now
            </Link>

            <Link to="/products" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "1rem 2.5rem", fontWeight: "600", letterSpacing: "3px", fontSize: "0.85rem", textDecoration: "none", borderRadius: "2px", textTransform: "uppercase" }}>
              View Lookbook
            </Link>
          </div>
        </div>
      </div>

      {/* MARQUEE STRIP */}
      <div style={{ background: "#f0c040", padding: "0.9rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "marquee 18s linear infinite" }}>
          {[...Array(12)].map((_, i) => (
            <span key={i} style={{ display: "inline-block", marginRight: "3rem", fontSize: "0.8rem", fontWeight: "800", letterSpacing: "4px", textTransform: "uppercase" }}>
              New Drop ✦ Limited Stock ✦ Free Shipping Over $100 ✦
            </span>
          ))}
        </div>
      </div>

      {/* keep the rest of your Featured Products, Banner CTA, and Footer code the same */}
    </div>
  );
}