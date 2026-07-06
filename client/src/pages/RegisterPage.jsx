import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/api/users/register`, form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.75)), url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600') center/cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 20px 50px rgba(0,0,0,.18)",
        }}
      >
        <p
          style={{
            color: "#c89b2b",
            letterSpacing: "4px",
            fontSize: ".75rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: ".75rem",
          }}
        >
          1204 FIT & LIFESTYLE
        </p>

        <h1
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: "900",
            fontSize: "2.2rem",
          }}
        >
          Create Account
        </h1>

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              color: "#b00020",
              padding: ".9rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontSize: ".9rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            ["name", "text", "Full Name"],
            ["email", "email", "Email Address"],
            ["password", "password", "Password"],
          ].map(([field, type, label]) => (
            <div key={field} style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: ".5rem",
                  fontWeight: "600",
                }}
              >
                {label}
              </label>

              <input
                name={field}
                type={type}
                value={form[field]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "18px",
              borderRadius: "8px",
              fontWeight: "800",
              fontSize: ".95rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Create Account
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.75rem", color: "#666" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#111", fontWeight: "700" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}