import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        form
      );

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
      <style>{`
        @media (max-width:768px){

          .login-card{
            padding:1.75rem !important;
            width:100% !important;
          }

          .login-title{
            font-size:2rem !important;
          }

          .login-btn{
            padding:16px !important;
          }

        }
      `}</style>

      <div
        className="login-card"
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#fff",
          borderRadius: "16px",
          padding: "2.5rem",
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
          className="login-title"
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: "900",
            fontSize: "2.5rem",
          }}
        >
          Welcome Back
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
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: ".5rem",
                fontWeight: "600",
              }}
            >
              Email Address
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
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

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: ".5rem",
                fontWeight: "600",
              }}
            >
              Password
            </label>

            <input
              name="password"
              type="password"
              value={form.password}
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

          <button
            className="login-btn"
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
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.75rem",
            color: "#666",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#111",
              fontWeight: "700",
            }}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}