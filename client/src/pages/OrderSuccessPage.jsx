import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', textAlign: 'center', padding: '2rem' }}>
      <div style={{ width: '80px', height: '80px', background: '#2a9d2a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <span style={{ color: '#fff', fontSize: '2rem' }}>✓</span>
      </div>
      <p style={{ color: '#f0c040', letterSpacing: '5px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>1204 FIT AND LIFESTYLE</p>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem' }}>Order Placed!</h1>
      <p style={{ color: '#666', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Thank you for your purchase. We'll get your order packed and shipped as soon as possible.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/products" style={{ background: '#111', color: '#fff', padding: '1rem 2.5rem', fontWeight: '800', letterSpacing: '3px', fontSize: '0.85rem', textDecoration: 'none', borderRadius: '2px' }}>
          KEEP SHOPPING
        </Link>
        <Link to="/" style={{ border: '2px solid #111', color: '#111', padding: '1rem 2.5rem', fontWeight: '800', letterSpacing: '3px', fontSize: '0.85rem', textDecoration: 'none', borderRadius: '2px' }}>
          GO HOME
        </Link>
      </div>
    </div>
  );
}