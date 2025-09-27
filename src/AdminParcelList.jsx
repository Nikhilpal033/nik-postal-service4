import { useEffect, useState } from "react";

function AdminParcelList() {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/parcels")
      .then(res => res.json())
      .then(data => setParcels(data));
  }, []);

  const handleStatusChange = (id, status) => {
    fetch(`http://localhost:5000/api/parcels/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setParcels(prev => prev.map(p => (p.id === id ? updated.parcel : p)));
      });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", textAlign: "center" }}>
      <h2>Admin Parcel Management</h2>
      <table border="1" style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map(parcel => (
            <tr key={parcel.id}>
              <td>{parcel.id}</td>
              <td>{parcel.recipient}</td>
              <td>{parcel.status}</td>
              <td>
                <select
                  value={parcel.status}
                  onChange={e => handleStatusChange(parcel.id, e.target.value)}
                >
                  <option value="Booked">Booked</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminParcelList;
