import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/api/users/login`, form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Login</h1>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {["email", "password"].map((field) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.3rem", textTransform: "capitalize" }}>
              {field}
            </label>
            <input
              name={field}
              type={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: "1rem" }}
            />
          </div>
        ))}

        <button type="submit" style={{ background: "#111", color: "#fff", padding: "1rem", width: "100%", fontSize: "1rem", border: "none", borderRadius: "4px", marginTop: "0.5rem" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#111", fontWeight: "bold" }}>
          Register
        </Link>
      </p>
    </div>
  );
}