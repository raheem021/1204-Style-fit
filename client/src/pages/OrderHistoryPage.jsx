import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { navigate('/login'); return; }

    axios.get('http://localhost:5000/api/orders/myorders', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(res => { setOrders(res.data); setLoading(false); })
    .catch(() => { setLoading(false); });
  }, []);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading orders...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <p style={{ color: '#f0c040', letterSpacing: '3px', fontSize: '0.75rem', fontWeight: '700' }}>MY ACCOUNT</p>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2rem' }}>Order History</h1>

      {orders.length === 0 ? (
        <p style={{ color: '#999' }}>You have no orders yet. <span style={{ color: '#f0c040', cursor: 'pointer' }} onClick={() => navigate('/products')}>Start shopping →</span></p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #222', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', background: '#111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>ORDER ID</p>
                <p style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{order._id}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>DATE</p>
                <p style={{ fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>TOTAL</p>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#f0c040' }}>${order.totalPrice?.toFixed(2)}</p>
              </div>
            </div>
            {order.items?.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderTop: '1px solid #222', fontSize: '0.9rem' }}>
                <span>{item.name} — Size: {item.size}</span>
                <span>x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}