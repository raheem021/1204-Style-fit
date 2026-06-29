import { useState, useEffect } from 'react';
import axios from 'axios';

const emptyForm = {
  name: '', price: '', description: '', category: '',
  sizes: '', images: '', stock: '', isFeatured: false,
};

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, payload, config);
        setMessage('Product updated!');
      } else {
        await axios.post('http://localhost:5000/api/products', payload, config);
        setMessage('Product added!');
      }
      setForm(emptyForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...product,
      sizes: product.sizes.join(', '),
      images: product.images.join(', '),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`, config);
    fetchProducts();
  };

  if (!user?.isAdmin) return <p style={{ padding: '2rem' }}>Access denied. Admins only.</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Admin Dashboard</h1>

      {/* Form */}
      <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>{editId ? 'Edit Product' : 'Add New Product'}</h2>
        {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['name', 'Product Name'], ['price', 'Price'], ['category', 'Category'], ['stock', 'Stock']].map(([field, label]) => (
              <div key={field}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>{label}</label>
                <input name={field} value={form[field]} onChange={handleChange} required
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>Sizes (comma separated, e.g. S, M, L, XL)</label>
            <input name="sizes" value={form.sizes} onChange={handleChange}
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>Image URLs (comma separated)</label>
            <input name="images" value={form.images} onChange={handleChange}
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} id="featured" />
            <label htmlFor="featured">Featured product (shows on homepage)</label>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit"
              style={{ background: '#111', color: '#fff', padding: '0.75rem 2rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {editId ? 'Update Product' : 'Add Product'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setForm(emptyForm); setEditId(null); setMessage(''); }}
                style={{ background: '#ccc', padding: '0.75rem 2rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <h2 style={{ marginBottom: '1rem' }}>All Products ({products.length})</h2>
      {products.length === 0 ? <p>No products yet.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', color: '#fff' }}>
              {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} style={{ background: i % 2 === 0 ? '#fff' : '#f5f5f5', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem' }}>
                  {p.images[0] && <img src={p.images[0]} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />}
                </td>
                <td style={{ padding: '0.75rem', fontWeight: '500' }}>{p.name}</td>
                <td style={{ padding: '0.75rem' }}>{p.category}</td>
                <td style={{ padding: '0.75rem' }}>${p.price}</td>
                <td style={{ padding: '0.75rem' }}>{p.stock}</td>
                <td style={{ padding: '0.75rem' }}>
                  <button onClick={() => handleEdit(p)}
                    style={{ marginRight: '0.5rem', padding: '0.4rem 0.8rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)}
                    style={{ padding: '0.4rem 0.8rem', background: '#c00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}