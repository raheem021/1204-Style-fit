import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  const navLink = {
    color: "#111",
    textDecoration: "none",
    fontSize: "0.78rem",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
  };

  return (
    <>
      <style>{`
        .premium-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(248, 248, 246, 0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(0,0,0,.08);
          height: 76px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 2rem;
        }

        .nav-left,
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .nav-right {
          justify-content: flex-end;
        }

        .brand-mark {
          color: #111;
          text-decoration: none;
          font-size: 1.7rem;
          font-weight: 950;
          letter-spacing: -1px;
        }

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          font-size: 1.8rem;
          color: #111;
        }

        .cart-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: .35rem;
        }

        .cart-count {
          background: #111;
          color: #fff;
          min-width: 20px;
          height: 20px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: .7rem;
          font-weight: 900;
        }

        .mobile-drawer {
          position: fixed;
          inset: 76px 0 0 0;
          z-index: 999;
          background: #111;
          color: #fff;
          padding: 2rem 1.25rem;
          transform: translateX(0);
        }

        .mobile-drawer a,
        .mobile-drawer button {
          color: #fff;
          text-decoration: none;
          background: transparent;
          border: none;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -1px;
          text-align: left;
          padding: .8rem 0;
        }

        .drawer-small {
          border-top: 1px solid rgba(255,255,255,.12);
          margin-top: 1.5rem;
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: .3rem;
        }

        @media (max-width: 900px) {
          .premium-nav {
            height: 68px;
            padding: 0 1rem;
            grid-template-columns: 44px 1fr 44px;
          }

          .nav-left,
          .desktop-only {
            display: none !important;
          }

          .brand-mark {
            justify-self: center;
            font-size: 1.25rem;
            text-align: center;
          }

          .mobile-menu-btn {
            display: block;
          }

          .nav-right {
            gap: 0;
          }
        }
      `}</style>

      <nav className="premium-nav">
        <div className="nav-left">
          <Link to="/products" style={navLink}>Shop</Link>
          <Link to="/products" style={navLink}>Collection</Link>
          <Link to="/products" style={navLink}>Lookbook</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "×" : "☰"}
        </button>

        <Link to="/" className="brand-mark" onClick={closeMenu}>
          1204
        </Link>

        <div className="nav-right">
          {user?.isAdmin && (
            <Link className="desktop-only" to="/admin" style={{ ...navLink, color: "#b58b18" }}>
              Admin
            </Link>
          )}

          {user ? (
            <>
              <Link className="desktop-only" to="/orders" style={navLink}>Orders</Link>
              <button className="desktop-only" onClick={handleLogout} style={{ ...navLink, background: "transparent", border: "none" }}>
                Logout
              </button>
            </>
          ) : (
            <Link className="desktop-only" to="/login" style={navLink}>Login</Link>
          )}

          <Link to="/cart" style={navLink} className="cart-pill" onClick={closeMenu}>
            Cart <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </nav>

      {open && (
        <div className="mobile-drawer">
          <Link to="/products" onClick={closeMenu}>Shop</Link>
          <Link to="/products" onClick={closeMenu}>Collection</Link>
          <Link to="/cart" onClick={closeMenu}>Cart ({cartCount})</Link>

          <div className="drawer-small">
            {user?.isAdmin && <Link to="/admin" onClick={closeMenu}>Admin</Link>}
            {user ? (
              <>
                <Link to="/orders" onClick={closeMenu}>Orders</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu}>Login</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
