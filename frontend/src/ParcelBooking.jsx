import React, { useState } from "react";

function ParcelBooking() {
  const [trackingId, setTrackingId] = useState("");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!trackingId) {
      setMessage("Please enter a Tracking ID");
      return;
    }

    const newBooking = {
      id: trackingId,
      sender,
      recipient,
      status: "Booked",
      weight,
    };

    try {
      const response = await fetch("http://localhost:5000/api/parcels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) throw new Error("Failed to book parcel");

      const data = await response.json();
      setMessage(`Parcel booked! Tracking ID: ${data.id}`);

      // Clear form
      setTrackingId("");
      setSender("");
      setRecipient("");
      setAddress("");
      setWeight("");
    } catch (err) {
      console.error("Booking Error:", err);
      setMessage("Error booking parcel");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "center" }}>
      <h2>Parcel Booking</h2>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Sender Name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Recipient Name"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Book Parcel
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default ParcelBooking;
