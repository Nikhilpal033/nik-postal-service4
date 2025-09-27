import React from "react";
import { useNavigate } from "react-router-dom";
import AdminUpdate from "./AdminUpdate"; // Admin parcel update component

function Dashboard() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // role saved after login

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Welcome to Nik Postal Service</h2>

      {/* General User Buttons */}
      <button onClick={() => navigate("/booking")} style={{ margin: "5px", padding: "10px" }}>
        Book Parcel
      </button>
      <button onClick={() => navigate("/tracking")} style={{ margin: "5px", padding: "10px" }}>
        Track Parcel
      </button>
      <button onClick={() => navigate("/contact")} style={{ margin: "5px", padding: "10px" }}>
        Contact Us
      </button>

      {/* Admin Controls */}
      {userRole === "admin" && (
        <div style={{ marginTop: "30px" }}>
          <h3>Admin Controls</h3>

          {/* Button to view messages */}
          <button 
            onClick={() => navigate("/admin/messages")} 
            style={{ margin: "5px", padding: "10px" }}
          >
            View Messages
          </button>

          {/* Parcel update form */}
          <AdminUpdate />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
