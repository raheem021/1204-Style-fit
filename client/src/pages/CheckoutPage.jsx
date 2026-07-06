import { useState } from "react";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "../components/StripePayment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const stripePromise = loadStripe("pk_test_51TlV5wKGxfrkIE8VbGut6zdZLd9l0mhysCGFLwVz1rLlGKKKRXiEt8sH1NmapZEnxaMNBwg171vuBm17OHgS5ZHG003NApCUoG");

const SHIPPING = 9.99;

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SHIPPING;

  const stepLabel = ["SHIPPING", "REVIEW ORDER", "PAYMENT"];

  const handleOrderSuccess = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post(
        `${API_URL}/api/orders`,
        {
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),
          shippingAddress: address,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Order save failed:", error);
    }

    clearCart();
    navigate("/order-success");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1rem",
    marginBottom: "1rem",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "2px",
    color: "#999",
    marginBottom: "6px",
    fontWeight: "700",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "3rem 1rem",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }

          .checkout-panel,
          .checkout-summary {
            width: 100% !important;
            position: static !important;
            padding: 1.25rem !important;
          }

          .checkout-address-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          .checkout-steps {
            overflow-x: auto !important;
            padding-bottom: 0.75rem !important;
            margin-bottom: 2rem !important;
          }

          .checkout-step {
            flex-shrink: 0 !important;
          }

          .checkout-step-label {
            font-size: 0.62rem !important;
            letter-spacing: 1.5px !important;
            white-space: nowrap !important;
          }

          .checkout-buttons {
            flex-direction: column !important;
          }

          .checkout-item {
            align-items: flex-start !important;
          }

          .checkout-item img {
            width: 58px !important;
            height: 58px !important;
            flex-shrink: 0 !important;
          }

          .checkout-container {
            width: 100% !important;
          }
        }
      `}</style>

      <div
        className="checkout-container"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <p
          style={{
            color: "#f0c040",
            letterSpacing: "3px",
            fontSize: "0.75rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          1204 FIT AND LIFESTYLE
        </p>

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "900",
            marginBottom: "0.5rem",
          }}
        >
          Checkout
        </h1>

        <div
          className="checkout-steps"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
            maxWidth: "100%",
          }}
        >
          {stepLabel.map((label, index) => (
            <div
              className="checkout-step"
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  background:
                    step === index + 1
                      ? "#f0c040"
                      : step > index + 1
                      ? "#fff"
                      : "#333",
                  color: step >= index + 1 ? "#000" : "#999",
                  flexShrink: 0,
                }}
              >
                {step > index + 1 ? "✓" : index + 1}
              </span>

              <span
                className="checkout-step-label"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "2px",
                  color:
                    step === index + 1
                      ? "#f0c040"
                      : step > index + 1
                      ? "#fff"
                      : "#555",
                  fontWeight: "700",
                }}
              >
                {label}
              </span>

              {index < 2 && <span style={{ color: "#333" }}>—</span>}
            </div>
          ))}
        </div>

        <div
          className="checkout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 380px",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div
            className="checkout-panel"
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            {step === 1 && (
              <>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    marginBottom: "1.5rem",
                  }}
                >
                  Shipping Address
                </h2>

                <label style={labelStyle}>STREET ADDRESS</label>
                <input
                  style={inputStyle}
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  placeholder="316 Wisconsin Avenue"
                />

                <label style={labelStyle}>CITY</label>
                <input
                  style={inputStyle}
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  placeholder="Holton"
                />

                <div
                  className="checkout-address-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label style={labelStyle}>POSTAL CODE</label>
                    <input
                      style={inputStyle}
                      value={address.postalCode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          postalCode: e.target.value,
                        })
                      }
                      placeholder="66436"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>COUNTRY</label>
                    <input
                      style={inputStyle}
                      value={address.country}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                      placeholder="United States"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (
                      address.street &&
                      address.city &&
                      address.postalCode &&
                      address.country
                    ) {
                      setStep(2);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "#f0c040",
                    color: "#000",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: "800",
                    letterSpacing: "2px",
                    marginTop: "0.5rem",
                  }}
                >
                  CONTINUE TO REVIEW →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    marginBottom: "1.5rem",
                  }}
                >
                  Review Your Order
                </h2>

                <div
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "10px",
                    padding: "1.2rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "2px",
                        color: "#f0c040",
                        fontWeight: "700",
                      }}
                    >
                      SHIPPING TO
                    </p>

                    <button
                      onClick={() => setStep(1)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#999",
                        fontSize: "0.8rem",
                        textDecoration: "underline",
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    📦 {address.street}, {address.city},{" "}
                    {address.postalCode}, {address.country}
                  </p>
                </div>

                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "2px",
                    color: "#f0c040",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                >
                  ORDER ITEMS
                </p>

                {cartItems.map((item, index) => (
                  <div
                    className="checkout-item"
                    key={`${item._id || index}-${item.size}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 0",
                      borderBottom: "1px solid #1a1a1a",
                    }}
                  >
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        background: "#111",
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: "700", marginBottom: "4px" }}>
                        {item.name}
                      </p>
                      <p style={{ color: "#999", fontSize: "0.85rem" }}>
                        Size: {item.size} · Qty: {item.quantity}
                      </p>
                    </div>

                    <p style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div
                  className="checkout-buttons"
                  style={{
                    marginTop: "1.5rem",
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "transparent",
                      color: "#fff",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      letterSpacing: "1px",
                    }}
                  >
                    ← BACK
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    style={{
                      flex: 2,
                      padding: "14px",
                      background: "#f0c040",
                      color: "#000",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "800",
                      letterSpacing: "2px",
                    }}
                  >
                    PROCEED TO PAYMENT →
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    marginBottom: "0.5rem",
                  }}
                >
                  Payment
                </h2>

                <div
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "10px",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#ccc",
                      lineHeight: 1.5,
                    }}
                  >
                    📦 {address.street}, {address.city},{" "}
                    {address.postalCode}
                  </p>

                  <button
                    onClick={() => setStep(1)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#999",
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </button>
                </div>

                <Elements stripe={stripePromise}>
                  <StripePayment amount={total} onSuccess={handleOrderSuccess} />
                </Elements>

                <button
                  onClick={() => setStep(2)}
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                    padding: "12px",
                    background: "transparent",
                    color: "#999",
                    border: "1px solid #222",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                  }}
                >
                  ← BACK TO REVIEW
                </button>
              </>
            )}
          </div>

          <div
            className="checkout-summary"
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "1.5rem",
              position: "sticky",
              top: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                marginBottom: "1.5rem",
                letterSpacing: "1px",
              }}
            >
              Order Summary
            </h3>

            {cartItems.map((item, index) => (
              <div
                key={`${item._id || index}-${item.size}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.name}
                  style={{
                    width: "56px",
                    height: "56px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    background: "#111",
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: "700" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#999" }}>
                    Size: {item.size} · Qty: {item.quantity}
                  </p>
                </div>

                <p style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div
              style={{
                borderTop: "1px solid #1a1a1a",
                marginTop: "1rem",
                paddingTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  color: "#999",
                  fontSize: "0.9rem",
                }}
              >
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  color: "#999",
                  fontSize: "0.9rem",
                }}
              >
                <span>Shipping</span>
                <span>${SHIPPING.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "800",
                  fontSize: "1.1rem",
                }}
              >
                <span>Total</span>
                <span style={{ color: "#f0c040" }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}