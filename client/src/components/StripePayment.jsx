import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { API_URL } from "../config";

export default function StripePayment({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            fontWeight: "700",
            fontSize: "0.8rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Card Details
        </label>

        <div
          style={{
            padding: "1rem",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            background: "#fafafa",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#111",
                  "::placeholder": { color: "#aaa" },
                },
                invalid: { color: "#c00" },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: "#c00", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%",
          padding: "1.25rem",
          background: loading ? "#666" : "#111",
          color: "#fff",
          border: "none",
          fontSize: "0.9rem",
          fontWeight: "800",
          letterSpacing: "3px",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "2px",
          textTransform: "uppercase",
        }}
      >
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>

      <p
        style={{
          textAlign: "center",
          color: "#999",
          fontSize: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        🔒 Powered by Stripe · Test card: 4242 4242 4242 4242
      </p>
    </form>
  );
}