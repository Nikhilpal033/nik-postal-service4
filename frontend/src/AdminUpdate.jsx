import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminUpdate() {
  const [parcels, setParcels] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/parcels")
      .then(res => setParcels(res.data))
      .catch(err => console.error("Error fetching parcels:", err));
  }, []);

  const handleUpdate = () => {
    if (!selectedId) return alert("Select a parcel");
    if (!status) return alert("Select a status");

    axios.put(`http://localhost:5000/api/parcels/${selectedId}`, { status })
      .then(res => {
        setMessage(`Parcel status updated to "${res.data.parcel.status}"`);
        // Optional: refresh parcels list
        return axios.get("http://localhost:5000/api/parcels");
      })
      .then(res => setParcels(res.data))
      .catch(err => {
        console.error("Update error:", err.response || err);
        setMessage("Error updating parcel status");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "center" }}>
      <h2>Update Parcel Status</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="">Select Parcel</option>
        {parcels.map(p => (
          <option key={p.id} value={p.id}>{p.id} - {p.recipient}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="">Select Status</option>
        <option value="Booked">Booked</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
        <option value="On Hold">On Hold</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button onClick={handleUpdate} style={{ padding: "10px", width: "100%" }}>
        Update Status
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default AdminUpdate;
