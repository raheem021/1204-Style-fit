import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setFeatured(data.filter((p) => p.isFeatured).slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ background: "#f7f7f3", color: "#111", overflowX: "hidden" }}>
      <style>{`
        .hero {
          min-height: 100vh;
          background:
            linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)),
            url("https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600") center/cover;
          display: flex;
          align-items: flex-end;
          padding: 6rem 4rem;
        }

        .hero h1 {
          color: #fff;
          font-size: clamp(4rem, 11vw, 10rem);
          line-height: .82;
          letter-spacing: -6px;
          text-transform: uppercase;
          max-width: 950px;
        }

        .hero p {
          color: rgba(255,255,255,.8);
          max-width: 430px;
          margin: 1.5rem 0 2rem;
          line-height: 1.7;
        }

        .btn-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          font-size: .8rem;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 999px;
          text-align: center;
        }

        .section {
          padding: 6rem 4rem;
          max-width: 1500px;
          margin: 0 auto;
        }

        .editorial-grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 1.5rem;
        }

        .editorial-card {
          min-height: 520px;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          background-size: cover;
          background-position: center;
        }

        .editorial-card div {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent, rgba(0,0,0,.75));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          color: #fff;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }

        .product-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 60px rgba(0,0,0,.12);
        }

        .product-img {
          width: 100%;
          height: 360px;
          object-fit: cover;
        }

        .marquee {
          background: #111;
          color: #f0c040;
          overflow: hidden;
          white-space: nowrap;
          padding: 1rem 0;
        }

        .marquee-track {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 900px) {
          .hero {
            padding: 5rem 1.2rem 3rem;
            align-items: flex-end;
          }

          .hero h1 {
            font-size: clamp(3.2rem, 17vw, 5rem);
            letter-spacing: -3px;
          }

          .section {
            padding: 4rem 1.2rem;
          }

          .editorial-grid {
            grid-template-columns: 1fr;
          }

          .editorial-card {
            min-height: 420px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .product-img {
            height: 420px;
          }

          .btn-row {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>

      <section className="hero">
        <div>
          <p style={{ color: "#f0c040", letterSpacing: "5px", fontWeight: 800, fontSize: ".75rem" }}>
            1204 FIT & LIFESTYLE
          </p>
          <h1>
            Fit For
            <br />
            Every
            <br />
            Lifestyle
          </h1>
          <p>
            Premium streetwear built for confidence, comfort, and identity.
            Discover pieces designed to move with your everyday lifestyle.
          </p>

          <div className="btn-row">
            <Link className="btn" to="/products" style={{ background: "#fff", color: "#111" }}>
              Shop Collection
            </Link>
            <Link className="btn" to="/products" style={{ border: "1px solid rgba(255,255,255,.6)", color: "#fff" }}>
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...Array(12)].map((_, i) => (
            <span key={i} style={{ marginRight: "3rem", fontWeight: 900, letterSpacing: "3px", fontSize: ".8rem" }}>
              NEW DROP ✦ LIMITED STOCK ✦ 1204 FIT & LIFESTYLE ✦
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "end", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#b58b18", letterSpacing: "4px", fontSize: ".75rem", fontWeight: 900 }}>
              EDITORIAL PICKS
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, marginTop: ".5rem" }}>
              Built for daily motion.
            </h2>
          </div>
          <Link to="/products" style={{ fontWeight: 900, borderBottom: "2px solid #111" }}>
            VIEW ALL
          </Link>
        </div>

        <div className="editorial-grid">
          <div
            className="editorial-card"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400)" }}
          >
            <div>
              <h3 style={{ fontSize: "2rem", marginBottom: ".5rem" }}>The Essential Drop</h3>
              <p>Clean pieces, bold presence, everyday comfort.</p>
            </div>
          </div>

          <div
            className="editorial-card"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200)" }}
          >
            <div>
              <h3 style={{ fontSize: "2rem", marginBottom: ".5rem" }}>Street Ready</h3>
              <p>Minimal styling with a sharp luxury edge.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <p style={{ color: "#b58b18", letterSpacing: "4px", fontSize: ".75rem", fontWeight: 900 }}>
          FEATURED PRODUCTS
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", margin: ".5rem 0 2rem" }}>
          Shop the look.
        </h2>

        <div className="products-grid">
          {featured.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="product-card">
              <img className="product-img" src={product.images?.[0]} alt={product.name} />
              <div style={{ padding: "1rem" }}>
                <p style={{ color: "#888", fontSize: ".7rem", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {product.category}
                </p>
                <h3 style={{ margin: ".3rem 0", fontSize: "1rem" }}>{product.name}</h3>
                <p style={{ fontWeight: 900 }}>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="section"
        style={{
          background: "#111",
          color: "#fff",
          maxWidth: "none",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#f0c040", letterSpacing: "4px", fontSize: ".75rem", fontWeight: 900 }}>
          1204 FIT & LIFESTYLE
        </p>
        <h2 style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: .9, margin: "1rem auto", maxWidth: "900px" }}>
          Wear your identity.
        </h2>
        <p style={{ color: "#bbb", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
          A modern clothing brand made for people who move with confidence.
        </p>
        <Link className="btn" to="/products" style={{ background: "#f0c040", color: "#111", display: "inline-block" }}>
          Explore Now
        </Link>
      </section>
    </div>
  );
}