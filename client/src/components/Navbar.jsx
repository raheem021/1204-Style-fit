import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "700",
    letterSpacing: "1px",
  };

  return (
    <>
      <nav
        style={{
          background: "#111",
          color: "#fff",
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "clamp(1rem, 4vw, 1.5rem)",
            fontWeight: "900",
            letterSpacing: "2px",
          }}
        >
          1204 Fit & Lifestyle
        </Link>

        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "1px solid #333",
            color: "#fff",
            fontSize: "1.5rem",
            padding: "0.3rem 0.7rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div
          style={{
            background: "#111",
            borderTop: "1px solid #222",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
            position: "sticky",
            top: "64px",
            zIndex: 999,
          }}
        >
          <Link to="/products" onClick={() => setOpen(false)} style={linkStyle}>
            Shop
          </Link>

          <Link to="/cart" onClick={() => setOpen(false)} style={linkStyle}>
            Cart
          </Link>

          {user?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              style={{ ...linkStyle, color: "#f0c040" }}
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <span style={{ color: "#aaa" }}>Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                style={{
                  background: "#f0c040",
                  color: "#111",
                  border: "none",
                  padding: "0.8rem",
                  borderRadius: "4px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} style={linkStyle}>
              Login
            </Link>
          )}
        </div>
      )}
    </>
  );
}