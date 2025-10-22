// // const express = require("express");
// // const cors = require("cors");
// // require("dotenv").config();
// // const { Pool } = require("pg");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // PostgreSQL connection
// // const pool = new Pool({
// //   connectionString: process.env.PG_URI,
// // });

// // // ✅ Route to fetch all appointments
// // app.get("/appointments", async (req, res) => {
// //   try {
// //     const result = await pool.query("SELECT * FROM appointments ORDER BY appointment_date, appointment_time;");
// //     res.json(result.rows);
// //   } catch (error) {
// //     console.error("❌ Error fetching appointments:", error);
// //     res.status(500).json({ error: "Database query failed" });
// //   }
// // });

// // // ✅ Route to insert new appointment (optional)
// // app.post("/appointments", async (req, res) => {
// //   const { patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration, queue_number } = req.body;

// //   try {
// //     const query = `
// //       INSERT INTO appointments 
// //       (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration, queue_number)
// //       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
// //       RETURNING *;
// //     `;

// //     const values = [patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration, queue_number];
// //     const result = await pool.query(query, values);

// //     res.status(201).json({ message: "Appointment added successfully", data: result.rows[0] });
// //   } catch (error) {
// //     console.error("❌ Error inserting appointment:", error);
// //     res.status(500).json({ error: "Insert failed" });
// //   }
// // });

// // // ✅ Start server
// // const PORT = 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const { Pool } = require("pg");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // PostgreSQL connection
// const pool = new Pool({
//   connectionString: process.env.PG_URI,
// });

// // ✅ Route to fetch all appointments
// app.get("/appointments", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         patient_name as "patientName",
//         phone_number as "phoneNumber",
//         email,
//         purpose,
//         doctor_name as "doctorName",
//         appointment_date as "date",
//         appointment_time as "time",
//         type,
//         notes,
//         status,
//         duration,
//         created_at as "createdAt",
//         updated_at as "updatedAt"
//       FROM appointments 
//       ORDER BY appointment_date, appointment_time;
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("❌ Error fetching appointments:", error);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

// // ✅ Route to insert new appointment
// app.post("/appointments", async (req, res) => {
//   const { 
//     patientName, 
//     phoneNumber, 
//     email, 
//     purpose, 
//     doctorName, 
//     date, 
//     time, 
//     type, 
//     notes, 
//     status = 'scheduled', 
//     duration = 30 
//   } = req.body;

//   // Validate required fields
//   if (!patientName || !phoneNumber || !purpose || !doctorName || !date || !time) {
//     return res.status(400).json({ 
//       error: "Missing required fields: patientName, phoneNumber, purpose, doctorName, date, time" 
//     });
//   }

//   try {
//     const query = `
//       INSERT INTO appointments 
//       (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//       RETURNING *;
//     `;

//     const values = [
//       patientName, 
//       phoneNumber, 
//       email, 
//       purpose, 
//       doctorName, 
//       date, 
//       time, 
//       type || 'consultation', 
//       notes, 
//       status, 
//       duration
//     ];

//     const result = await pool.query(query, values);
    
//     // Format the response to match frontend expectations
//     const appointment = {
//       id: result.rows[0].id,
//       patientName: result.rows[0].patient_name,
//       phoneNumber: result.rows[0].phone_number,
//       email: result.rows[0].email,
//       purpose: result.rows[0].purpose,
//       doctorName: result.rows[0].doctor_name,
//       date: result.rows[0].appointment_date,
//       time: result.rows[0].appointment_time,
//       type: result.rows[0].type,
//       notes: result.rows[0].notes,
//       status: result.rows[0].status,
//       duration: result.rows[0].duration
//     };

//     res.status(201).json({ 
//       message: "Appointment added successfully", 
//       data: appointment 
//     });
//   } catch (error) {
//     console.error("❌ Error inserting appointment:", error);
//     res.status(500).json({ error: "Insert failed" });
//   }
// });

// // ✅ Route to update appointment status (CRITICAL for frontend)
// app.patch("/appointments/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!status) {
//     return res.status(400).json({ error: "Status is required" });
//   }

//   try {
//     const query = `
//       UPDATE appointments 
//       SET status = $1, updated_at = CURRENT_TIMESTAMP
//       WHERE id = $2
//       RETURNING *;
//     `;
    
//     const result = await pool.query(query, [status, id]);
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     // Format response
//     const appointment = {
//       id: result.rows[0].id,
//       patientName: result.rows[0].patient_name,
//       phoneNumber: result.rows[0].phone_number,
//       email: result.rows[0].email,
//       purpose: result.rows[0].purpose,
//       doctorName: result.rows[0].doctor_name,
//       date: result.rows[0].appointment_date,
//       time: result.rows[0].appointment_time,
//       type: result.rows[0].type,
//       notes: result.rows[0].notes,
//       status: result.rows[0].status,
//       duration: result.rows[0].duration
//     };
    
//     res.json({ 
//       message: "Appointment updated successfully", 
//       data: appointment 
//     });
//   } catch (error) {
//     console.error("❌ Error updating appointment:", error);
//     res.status(500).json({ error: "Update failed" });
//   }
// });

// // ✅ Route to get appointment by ID
// app.get("/appointments/:id", async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         patient_name as "patientName",
//         phone_number as "phoneNumber",
//         email,
//         purpose,
//         doctor_name as "doctorName",
//         appointment_date as "date",
//         appointment_time as "time",
//         type,
//         notes,
//         status,
//         duration
//       FROM appointments 
//       WHERE id = $1
//     `, [id]);
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }
    
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("❌ Error fetching appointment:", error);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

// // ✅ Route to delete appointment
// app.delete("/appointments/:id", async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const result = await pool.query(
//       "DELETE FROM appointments WHERE id = $1 RETURNING *", 
//       [id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }
    
//     res.json({ message: "Appointment deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting appointment:", error);
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// // ✅ Health check route
// app.get("/health", async (req, res) => {
//   try {
//     await pool.query("SELECT 1");
//     res.json({ 
//       status: "OK", 
//       message: "Server and database are running correctly",
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       status: "Error", 
//       message: "Database connection failed" 
//     });
//   }
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Health check available at http://localhost:${PORT}/health`);
// });






// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'hospital_management',
//   password: 'kishore18',
//   port: 5432,
//   ssl: false
// });

// // ✅ Route to fetch all appointments - FIXED
// app.get("/appointments", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         patient_name as "patientName",
//         phone_number as "phoneNumber",
//         email,
//         purpose,
//         doctor_name as "doctorName",
//         appointment_date as "date",  // ← CRITICAL FIX
//         appointment_time as "time",
//         type,
//         notes,
//         status,
//         duration,
//         created_at as "createdAt",
//         updated_at as "updatedAt"
//       FROM appointments 
//       ORDER BY appointment_date, appointment_time;
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("❌ Error fetching appointments:", error);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

// // ✅ Route to insert new appointment - FIXED
// app.post("/appointments", async (req, res) => {
//   const { 
//     patientName, 
//     phoneNumber, 
//     email, 
//     purpose, 
//     doctorName, 
//     date, 
//     time, 
//     type, 
//     notes, 
//     status = 'scheduled', 
//     duration = 30 
//   } = req.body;

//   try {
//     const query = `
//       INSERT INTO appointments 
//       (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//       RETURNING *;
//     `;

//     const values = [
//       patientName, 
//       phoneNumber, 
//       email, 
//       purpose, 
//       doctorName, 
//       date,  // ← This will go into appointment_date
//       time, 
//       type || 'consultation', 
//       notes, 
//       status, 
//       duration
//     ];

//     const result = await pool.query(query, values);

//     // Format response to match frontend
//     const appointment = {
//       id: result.rows[0].id,
//       patientName: result.rows[0].patient_name,
//       phoneNumber: result.rows[0].phone_number,
//       email: result.rows[0].email,
//       purpose: result.rows[0].purpose,
//       doctorName: result.rows[0].doctor_name,
//       date: result.rows[0].appointment_date,  // ← Map back to "date"
//       time: result.rows[0].appointment_time,
//       type: result.rows[0].type,
//       notes: result.rows[0].notes,
//       status: result.rows[0].status,
//       duration: result.rows[0].duration
//     };

//     res.status(201).json({ 
//       message: "Appointment added successfully", 
//       data: appointment 
//     });
//   } catch (error) {
//     console.error("❌ Error inserting appointment:", error);
//     res.status(500).json({ error: "Insert failed" });
//   }
// });

// // ✅ Route to update appointment status - FIXED
// app.patch("/appointments/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     const query = `
//       UPDATE appointments 
//       SET status = $1, updated_at = CURRENT_TIMESTAMP
//       WHERE id = $2
//       RETURNING *;
//     `;
    
//     const result = await pool.query(query, [status, id]);
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     // Format response
//     const appointment = {
//       id: result.rows[0].id,
//       patientName: result.rows[0].patient_name,
//       phoneNumber: result.rows[0].phone_number,
//       email: result.rows[0].email,
//       purpose: result.rows[0].purpose,
//       doctorName: result.rows[0].doctor_name,
//       date: result.rows[0].appointment_date,  // ← Map back to "date"
//       time: result.rows[0].appointment_time,
//       type: result.rows[0].type,
//       notes: result.rows[0].notes,
//       status: result.rows[0].status,
//       duration: result.rows[0].duration
//     };
    
//     res.json({ 
//       message: "Appointment updated successfully", 
//       data: appointment 
//     });
//   } catch (error) {
//     console.error("❌ Error updating appointment:", error);
//     res.status(500).json({ error: "Update failed" });
//   }
// });

// // ✅ Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));





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
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Insert new appointment
app.post("/appointments", async (req, res) => {
  const { patientName, phoneNumber, email, purpose, doctorName, date, time, type, notes, status = 'scheduled', duration = 30 } = req.body;

  try {
    const query = `
      INSERT INTO appointments 
      (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;

    const values = [patientName, phoneNumber, email, purpose, doctorName, date, time, type || 'consultation', notes, status, duration];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting appointment:", error);
    res.status(500).json({ error: "Insert failed" });
  }
});

// Update appointment status
app.patch("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = `
      UPDATE appointments 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Appointment not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating appointment:", error);
    res.status(500).json({ error: "Update failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
