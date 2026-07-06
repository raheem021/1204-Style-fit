import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0)
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fafafa", padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</p>
        <h2 style={{ fontWeight: "900", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Your cart is empty</h2>
        <p style={{ color: "#999", marginBottom: "2rem" }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" style={{ background: "#111", color: "#fff", padding: "1rem 2.5rem", fontWeight: "800", letterSpacing: "3px", fontSize: "0.85rem", borderRadius: "2px" }}>
          SHOP NOW
        </Link>
      </div>
    );

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", padding: "3rem 1rem", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 768px) {
          .cart-layout {
            display: flex !important;
            flex-direction: column !important;
          }

          .cart-item {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .cart-item img {
            width: 100% !important;
            height: auto !important;
            max-height: 320px !important;
          }

          .cart-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
          }

          .cart-summary {
            position: static !important;
            width: 100% !important;
            margin-top: 2rem !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <p style={{ color: "#f0c040", letterSpacing: "5px", fontSize: "0.75rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          1204 FIT AND LIFESTYLE
        </p>

        <h1 style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "-1px", marginBottom: "3rem" }}>
          Your Cart ({cartItems.length})
        </h1>

        <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", alignItems: "start" }}>
          <div>
            {cartItems.map((item) => (
              <div
                className="cart-item"
                key={`${item._id}-${item.size}`}
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  width: "100%",
                }}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  style={{ width: "100px", height: "120px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
                />

                <div style={{ flex: 1, width: "100%" }}>
                  <p style={{ fontSize: "0.7rem", color: "#999", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.3rem" }}>
                    {item.category}
                  </p>

                  <h3 style={{ marginBottom: "0.5rem", fontWeight: "800", fontSize: "1.1rem" }}>
                    {item.name}
                  </h3>

                  <p style={{ marginBottom: "0.75rem", color: "#666", fontSize: "0.85rem" }}>
                    Size: <strong>{item.size}</strong>
                  </p>

                  <div className="cart-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontWeight: "800", fontSize: "1.1rem" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <span style={{ color: "#999", fontSize: "0.85rem" }}>Qty: {item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item._id, item.size)}
                        style={{ background: "none", border: "none", color: "#c00", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "1px", padding: 0 }}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/products" style={{ color: "#111", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "2px", borderBottom: "2px solid #111", paddingBottom: "2px" }}>
              ← CONTINUE SHOPPING
            </Link>
          </div>

          <div className="cart-summary" style={{ background: "#fff", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", position: "sticky", top: "2rem" }}>
            <h2 style={{ fontWeight: "900", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Order Summary</h2>

            {cartItems.map((item) => (
              <div key={`${item._id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                <span style={{ color: "#666" }}>{item.name} × {item.quantity}</span>
                <span style={{ fontWeight: "600" }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #eee", margin: "1.5rem 0", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                <span style={{ color: "#666" }}>Subtotal</span>
                <span style={{ fontWeight: "600" }}>${totalPrice.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                <span style={{ color: "#666" }}>Shipping</span>
                <span style={{ fontWeight: "600", color: totalPrice >= 100 ? "#2a9d2a" : "#111" }}>
                  {totalPrice >= 100 ? "FREE" : "$9.99"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
              <span style={{ fontWeight: "900", fontSize: "1.1rem" }}>Total</span>
              <span style={{ fontWeight: "900", fontSize: "1.1rem" }}>
                ${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{ width: "100%", padding: "1.25rem", background: "#111", color: "#fff", border: "none", fontSize: "0.9rem", fontWeight: "800", letterSpacing: "3px", borderRadius: "2px", textTransform: "uppercase" }}
            >
              Proceed to Checkout
            </button>

            <p style={{ textAlign: "center", color: "#999", fontSize: "0.78rem", marginTop: "1rem" }}>
              🔒 Secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}