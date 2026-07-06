import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#111', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
        1204 Fit & Lifestyle
      </Link>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/products" style={{ color: '#fff' }}>Shop</Link>
        <Link to="/cart" style={{ color: '#fff' }}>Cart</Link>
        {user ? (
          <>
            {user.isAdmin && <Link to="/admin" style={{ color: '#f0c040' }}>Admin</Link>}
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #fff', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}