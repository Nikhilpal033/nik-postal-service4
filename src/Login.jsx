import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const validUserId = "nik";
    const validPassword = "123";

    if (userId === validUserId && password === validPassword) {
      // Save login info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userId);

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid User ID or Password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form onSubmit={handleLogin} style={{ width: "300px", textAlign: "center" }}>
        <h2>Employee Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
