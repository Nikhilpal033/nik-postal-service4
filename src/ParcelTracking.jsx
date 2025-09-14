import React, { useState } from "react";

function ParcelTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();

    // Get bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const parcel = bookings.find((b) => b.id === trackingId.trim());

    if (parcel) {
      setStatus(`Parcel Status: ${parcel.status}`);
    } else {
      setStatus("Tracking ID not found");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "center" }}>
      <h2>Parcel Tracking</h2>
      <form onSubmit={handleTrack}>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer", width: "100%" }}
        >
          Track Parcel
        </button>
      </form>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}

export default ParcelTracking;
