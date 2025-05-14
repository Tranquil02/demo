import { useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://e8d4-2404-7c80-5c-4ec6-9ca3-ba7c-9275-f277.ngrok-free.app/api/payment", {
        amount,
        email,
      });

      // Assuming res.data contains HTML form as a string
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.data, "text/html");
      const form = doc.querySelector("form");
      if (form) {
        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Payment form not received from server.");
      }
    } catch (error) {
      alert("Payment initiation failed: " + (error?.response?.data?.message || error.message));
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Paytm Test Payment</h2>
      <form onSubmit={handlePay}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="amount" style={{ display: "block", marginBottom: "0.5rem" }}>
            Amount
          </label>
          <input
            id="amount"
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Pay with Paytm
        </button>
      </form>
    </div>
  );
}

export default App;
