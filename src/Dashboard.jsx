import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Nikhil Postal Service</h2>
      <button onClick={() => navigate("/booking")}>Book Parcel</button>
      <button onClick={() => navigate("/tracking")}>Track Parcel</button>
      <button onClick={() => navigate("/contact")}>Contact Us</button>
    </div>
  );
}

export default Dashboard;