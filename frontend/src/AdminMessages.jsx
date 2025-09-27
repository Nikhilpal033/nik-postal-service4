import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // get saved JWT
    if (!token) {
      setError("No token found. Login as admin first.");
      return;
    }

    axios.get("http://localhost:5000/api/contact", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessages(res.data))
    .catch(err => setError("Unable to load messages"));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      alert("Error deleting message");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        messages.map(msg => (
          <div key={msg.id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <button onClick={() => handleDelete(msg.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminMessages;
