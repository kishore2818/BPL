
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hospital_management',
  password: 'kishore18',
  port: 5432
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Fetch all appointments
app.get("/appointments", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        patient_name AS "patientName",
        phone_number AS "phoneNumber",
        email,
        purpose,
        doctor_name AS "doctorName",
        appointment_date AS "date",
        appointment_time AS "time",
        type,
        notes,
        status,
        duration,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM appointments
      ORDER BY appointment_date, appointment_time;
    `);
    console.log(`✅ Fetched ${result.rows.length} appointments`);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Get appointment by ID
app.get("/appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        id,
        patient_name AS "patientName",
        phone_number AS "phoneNumber",
        email,
        purpose,
        doctor_name AS "doctorName",
        appointment_date AS "date",
        appointment_time AS "time",
        type,
        notes,
        status,
        duration,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM appointments
      WHERE id = $1;
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    console.log(`✅ Fetched appointment ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching appointment:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Insert new appointment
app.post("/appointments", async (req, res) => {
  const { 
    patientName, 
    phoneNumber, 
    email, 
    purpose, 
    doctorName, 
    date, 
    time, 
    type, 
    notes, 
    status = 'scheduled', 
    duration = 30 
  } = req.body;

  // Validation
  if (!patientName || !phoneNumber || !purpose || !doctorName || !date || !time) {
    return res.status(400).json({ 
      error: "Missing required fields: patientName, phoneNumber, purpose, doctorName, date, time" 
    });
  }

  try {
    const query = `
      INSERT INTO appointments 
      (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING 
        id,
        patient_name AS "patientName",
        phone_number AS "phoneNumber",
        email,
        purpose,
        doctor_name AS "doctorName",
        appointment_date AS "date",
        appointment_time AS "time",
        type,
        notes,
        status,
        duration,
        created_at AS "createdAt",
        updated_at AS "updatedAt";
    `;

    const values = [
      patientName, 
      phoneNumber, 
      email || null, 
      purpose, 
      doctorName, 
      date, 
      time, 
      type || 'consultation', 
      notes || null, 
      status, 
      duration
    ];

    const result = await pool.query(query, values);
    console.log(`✅ Created new appointment for ${patientName}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting appointment:", error);
    res.status(500).json({ error: "Insert failed" });
  }
});

// Update appointment
app.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { 
    patientName, 
    phoneNumber, 
    email, 
    purpose, 
    doctorName, 
    date, 
    time, 
    type, 
    notes, 
    status, 
    duration 
  } = req.body;

  // Validation
  if (!patientName || !phoneNumber || !purpose || !doctorName || !date || !time) {
    return res.status(400).json({ 
      error: "Missing required fields: patientName, phoneNumber, purpose, doctorName, date, time" 
    });
  }

  try {
    const query = `
      UPDATE appointments 
      SET 
        patient_name = $1,
        phone_number = $2,
        email = $3,
        purpose = $4,
        doctor_name = $5,
        appointment_date = $6,
        appointment_time = $7,
        type = $8,
        notes = $9,
        status = $10,
        duration = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING 
        id,
        patient_name AS "patientName",
        phone_number AS "phoneNumber",
        email,
        purpose,
        doctor_name AS "doctorName",
        appointment_date AS "date",
        appointment_time AS "time",
        type,
        notes,
        status,
        duration,
        created_at AS "createdAt",
        updated_at AS "updatedAt";
    `;

    const values = [
      patientName, 
      phoneNumber, 
      email || null, 
      purpose, 
      doctorName, 
      date, 
      time, 
      type || 'consultation', 
      notes || null, 
      status || 'scheduled', 
      duration || 30, 
      id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    console.log(`✅ Updated appointment ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating appointment:", error);
    res.status(500).json({ error: "Update failed" });
  }
});

// Update appointment status
app.patch("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: "Invalid status. Must be one of: scheduled, confirmed, in-progress, completed, cancelled" 
    });
  }

  try {
    const query = `
      UPDATE appointments 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING 
        id,
        patient_name AS "patientName",
        phone_number AS "phoneNumber",
        email,
        purpose,
        doctor_name AS "doctorName",
        appointment_date AS "date",
        appointment_time AS "time",
        type,
        notes,
        status,
        duration,
        created_at AS "createdAt",
        updated_at AS "updatedAt";
    `;
    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    
    console.log(`✅ Updated appointment ${id} status to ${status}`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating appointment:", error);
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete appointment
app.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM appointments WHERE id = $1 RETURNING id;`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    console.log(`✅ Deleted appointment ${id}`);
    res.json({ message: "Appointment deleted successfully", id: result.rows[0].id });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    res.status(500).json({ error: "Delete failed" });
  }
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: "OK", database: "Connected" });
  } catch (error) {
    res.status(500).json({ status: "Error", database: "Disconnected", error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));