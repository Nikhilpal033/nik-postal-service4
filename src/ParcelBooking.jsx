import React, { useState } from "react";

function ParcelBooking() {
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();

    // Generate unique Tracking ID using timestamp
    const trackingId = "PKG" + Date.now();

    // Create booking object
    const newBooking = { id: trackingId, recipient, address, weight, status: "Booked" };

    // Get existing bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(newBooking);

    // Save updated bookings to localStorage
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Show success message
    setMessage(`Parcel booked! Tracking ID: ${trackingId}`);

    // Clear form
    setRecipient("");
    setAddress("");
    setWeight("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "center" }}>
      <h2>Parcel Booking</h2>
      <form onSubmit={handleBooking}>
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
          style={{ padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer", width: "100%" }}
        >
          Book Parcel
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default ParcelBooking;
