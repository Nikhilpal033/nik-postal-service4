import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "pg";
import jwt from "jsonwebtoken";

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "nik_user",        // your DB username
  host: "localhost",
  database: "nik_postal",  // your DB name
  password: "091177",      // your DB password
  port: 5432,
});

// Secret key for JWT
const JWT_SECRET = "supersecretkey"; // ⚠️ Change to env var in production

// ================== Middleware ==================
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid/Expired token" });
    req.user = user; // decoded { id, username, role }
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// ================== LOGIN ==================
// ========== LOGIN WITH DATABASE ==========
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Generate JWT token
      const token = jwt.sign(
        { username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        success: true,
        user: { username: user.username, role: user.role },
        token, // <-- send token
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("DB Login Error:", err);
    res.status(500).send("Database error");
  }
});

// ================== PARCELS ==================
// Create new parcel (user access)
// ========== PARCELS ==========
// Create new parcel (no token required)
// ========== PARCELS ==========
// Create new parcel
app.post("/api/parcels", async (req, res) => {
  const { id, sender, recipient, status, weight } = req.body;

  if (!id || !sender || !recipient || !status || !weight) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO parcels (id, sender, recipient, status, weight, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      [id, sender, recipient, status, weight]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Insert Error:", err);
    res.status(500).send("Database error");
  }
});

// Get all parcels
app.get("/api/parcels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM parcels ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("DB Query Error:", err);
    res.status(500).send("Database error");
  }
});

// Track parcels (user access)
app.get("/api/parcels", authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM parcels ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("DB Query Error:", err);
    res.status(500).send("Database error");
  }
});

// Update parcel status
// Update parcel status
app.put("/api/parcels/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: "Status is required" });

  try {
    const result = await pool.query(
      "UPDATE parcels SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    res.json({ message: "Parcel status updated", parcel: result.rows[0] });
  } catch (err) {
    console.error("DB Update Error:", err);
    res.status(500).json({ error: "Error updating parcel status" });
  }
});



// Delete parcel (admin only)
// Delete contact message (admin only)
app.delete("/api/contact/:id", authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM contact WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ success: true, deleted: result.rows[0] });
  } catch (err) {
    console.error("DB Delete Error:", err);
    res.status(500).json({ error: "Error deleting message" });
  }
});


// Get a single parcel by tracking ID
app.get("/api/parcels/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM parcels WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Query Error:", err);
    res.status(500).send("Database error");
  }
});


// ================== CONTACT ==================
// Send message (user access)
app.post("/api/contact", authenticate, async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO contact (name, email, message, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [name, email, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Insert Error:", err);
    res.status(500).send("Database error");
  }
});

// View all contact messages (admin only)
app.get("/api/contact", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("DB Query Error:", err);
    res.status(500).send("Database error");
  }
});

// ================== START SERVER ==================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
