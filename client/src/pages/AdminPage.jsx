import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  category: "",
  sizes: "",
  images: "",
  stock: "",
  isFeatured: false,
};

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_URL}/api/products`);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/api/products/${editId}`, payload, config);
        setMessage("Product updated!");
      } else {
        await axios.post(`${API_URL}/api/products`, payload, config);
        setMessage("Product added!");
      }

      setForm(emptyForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...product,
      sizes: product.sizes.join(", "),
      images: product.images.join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${API_URL}/api/products/${id}`, config);
    fetchProducts();
  };

  if (!user?.isAdmin) return <p style={{ padding: "2rem" }}>Access denied. Admins only.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* keep the rest of your JSX exactly the same */}
    </div>
  );
}