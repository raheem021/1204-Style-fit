import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        textAlign: "center",
        padding: "2rem 1rem",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .success-actions {
            flex-direction: column !important;
            width: 100% !important;
          }

          .success-actions a {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "480px", width: "100%" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#2a9d2a",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <span style={{ color: "#fff", fontSize: "2rem" }}>✓</span>
        </div>

        <p
          style={{
            color: "#f0c040",
            letterSpacing: "4px",
            fontSize: "0.75rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          1204 FIT AND LIFESTYLE
        </p>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "900",
            letterSpacing: "-1px",
            marginBottom: "1rem",
          }}
        >
          Order Placed!
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Thank you for your purchase. We'll get your order packed and shipped
          as soon as possible.
        </p>

        <div
          className="success-actions"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Link
            to="/products"
            style={{
              background: "#111",
              color: "#fff",
              padding: "1rem 2rem",
              fontWeight: "800",
              letterSpacing: "3px",
              fontSize: "0.85rem",
              borderRadius: "2px",
            }}
          >
            KEEP SHOPPING
          </Link>

          <Link
            to="/"
            style={{
              border: "2px solid #111",
              color: "#111",
              padding: "1rem 2rem",
              fontWeight: "800",
              letterSpacing: "3px",
              fontSize: "0.85rem",
              borderRadius: "2px",
            }}
          >
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}goi