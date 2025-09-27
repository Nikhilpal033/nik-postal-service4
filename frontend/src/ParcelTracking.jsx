import React, { useState } from "react";

function ParcelTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setParcel(null);

    try {
      const response = await fetch(`http://localhost:5000/api/parcels/${trackingId.trim()}`);
      if (!response.ok) {
        throw new Error("Parcel not found");
      }
      const data = await response.json();
      setParcel(data);
    } catch (err) {
      setError(err.message);
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

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {parcel && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <p><strong>Tracking ID:</strong> {parcel.id}</p>
          <p><strong>Recipient:</strong> {parcel.recipient}</p>
          <p><strong>Status:</strong> {parcel.status}</p>
          <p><strong>Weight:</strong> {parcel.weight} kg</p>
        </div>
      )}
    </div>
  );
}

export default ParcelTracking;
