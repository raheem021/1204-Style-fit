import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Please select a size');
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div style={{ padding: '4rem', textAlign: 'center', color: '#999' }}>Loading...</div>;

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Breadcrumb */}
        <p style={{ color: '#999', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '2rem' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
          {' '}/{'  '}
          <span onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>Shop</span>
          {' '}/{'  '}
          <span style={{ color: '#111', fontWeight: '600' }}>{product.name}</span>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Images */}
          <div>
            <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
              <img src={product.images[activeImg]} alt={product.name}
                style={{ width: '100%', height: '560px', objectFit: 'cover', display: 'block' }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setActiveImg(i)}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: activeImg === i ? '2px solid #111' : '2px solid transparent', opacity: activeImg === i ? 1 : 0.6, transition: 'all 0.2s' }} />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ position: 'sticky', top: '2rem' }}>
            <p style={{ color: '#f0c040', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{product.category}</p>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px', margin: '0 0 1rem', lineHeight: 1.1 }}>{product.name}</h1>
            <p style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 1.5rem' }}>${product.price}</p>

            <div style={{ width: '40px', height: '3px', background: '#f0c040', marginBottom: '1.5rem' }} />

            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{product.description}</p>

            {/* Size selector */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <p style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>Select Size</p>
                <p style={{ color: '#999', fontSize: '0.8rem', cursor: 'pointer', margin: 0 }}>Size Guide</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} style={{
                    padding: '0.75rem 1.25rem', border: selectedSize === size ? '2px solid #111' : '1px solid #ddd',
                    background: selectedSize === size ? '#111' : '#fff',
                    color: selectedSize === size ? '#fff' : '#111',
                    fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                    borderRadius: '2px', transition: 'all 0.2s',
                    letterSpacing: '1px',
                  }}>{size}</button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button onClick={handleAddToCart} style={{
              width: '100%', padding: '1.25rem',
              background: added ? '#2a9d2a' : '#111',
              color: '#fff', border: 'none', fontSize: '0.9rem',
              fontWeight: '800', letterSpacing: '3px', cursor: 'pointer',
              borderRadius: '2px', transition: 'background 0.3s',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <button onClick={() => { handleAddToCart(); navigate('/cart'); }} style={{
              width: '100%', padding: '1.25rem',
              background: '#fff', color: '#111',
              border: '2px solid #111', fontSize: '0.9rem',
              fontWeight: '800', letterSpacing: '3px', cursor: 'pointer',
              borderRadius: '2px', textTransform: 'uppercase',
            }}>
              Buy Now
            </button>

            {/* Stock */}
            <p style={{ color: product.stock > 10 ? '#2a9d2a' : '#e07000', fontSize: '0.85rem', fontWeight: '600', marginTop: '1rem' }}>
              {product.stock > 10 ? `✓ In Stock (${product.stock} available)` : product.stock > 0 ? `⚠ Only ${product.stock} left!` : '✗ Out of Stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}