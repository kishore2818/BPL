

// // Import PostgreSQL client
// const { Client } = require('pg');

// // Direct connection string to your local database
// const client = new Client({
//   connectionString: 'postgresql://postgres:kishore18@localhost:5432/hospital_management',
//   ssl: false // ❌ Disable SSL since this is a local connection
// });

// // Function to insert data with proper schema
// const insertAppointments = async () => {
//   try {
//     await client.connect();
//     console.log("✅ Connected to PostgreSQL");

//     // First, let's create the table if it doesn't exist
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS appointments (
//         id SERIAL PRIMARY KEY,
//         patient_name VARCHAR(100) NOT NULL,
//         phone_number VARCHAR(20) NOT NULL,
//         email VARCHAR(100),
//         purpose TEXT NOT NULL,
//         doctor_name VARCHAR(100) NOT NULL,
//         appointment_date DATE NOT NULL,
//         appointment_time TIME NOT NULL,
//         type VARCHAR(50) DEFAULT 'consultation',
//         notes TEXT,
//         status VARCHAR(20) DEFAULT 'scheduled',
//         duration INTEGER DEFAULT 30,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `;

//     await client.query(createTableQuery);
//     console.log("✅ Table created/verified successfully!");

//     // Clear existing data to avoid duplicates
//     await client.query('DELETE FROM appointments;');
//     console.log("✅ Cleared existing appointments");

//     // Insert new sample data matching frontend requirements
//     const insertQuery = `
//       INSERT INTO appointments 
//       (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration)
//       VALUES
//       ('John Doe', '9876543210', 'john@example.com', 'General Checkup', 'Dr. Ravi Kumar', '2025-01-15', '10:30', 'consultation', 'First-time visit, no known allergies', 'scheduled', 30),
//       ('Priya Sharma', '9123456789', 'priya@gmail.com', 'Fever and Headache', 'Dr. Meena Raj', '2025-01-15', '11:00', 'consultation', 'High fever for 2 days, body pain', 'confirmed', 30),
//       ('Arun Nair', '9988776655', 'arun@health.com', 'Heart Checkup', 'Dr. Suresh Menon', '2025-01-15', '09:45', 'cardiology', 'Routine heart checkup, bring previous reports', 'scheduled', 45),
//       ('Sneha Patel', '9876543211', 'sneha@email.com', 'Diabetes Follow-up', 'Dr. Anjali Desai', '2025-01-15', '14:30', 'follow-up', 'Monthly diabetes monitoring', 'in-progress', 30),
//       ('Rahul Verma', '9123456780', 'rahul@company.com', 'Vaccination', 'Dr. Priya Singh', '2025-01-15', '15:00', 'vaccination', 'Annual flu vaccination', 'completed', 15),
//       ('Anita Joshi', '9988776656', 'anita@home.com', 'Knee Pain', 'Dr. Rajesh Kumar', '2025-01-16', '10:00', 'consultation', 'Chronic knee pain, need X-ray', 'scheduled', 30),
//       ('Mohammed Khan', '9876543212', 'mohammed@work.com', 'Eye Checkup', 'Dr. Sunita Rao', '2025-01-16', '11:30', 'consultation', 'Blurry vision for 1 week', 'confirmed', 30),
//       ('Deepika Reddy', '9123456781', 'deepika@mail.com', 'Pregnancy Checkup', 'Dr. Meena Raj', '2025-01-16', '13:00', 'check-up', 'Regular pregnancy checkup - 6 months', 'scheduled', 45);
//     `;

//     await client.query(insertQuery);
//     console.log("✅ Appointment records inserted successfully!");

//     // Verify the inserted data
//     const result = await client.query('SELECT COUNT(*) as count FROM appointments;');
//     console.log(`📊 Total appointments in database: ${result.rows[0].count}`);

//   } catch (err) {
//     console.error("❌ Error:", err.message);
//   } finally {
//     await client.end();
//     console.log("🔒 Connection closed");
//   }
// };

// // Run the insertion
// insertAppointments();




const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:kishore18@localhost:5432/hospital_management',
  ssl: false
});

const setupDatabase = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // 1️⃣ Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        purpose TEXT NOT NULL,
        doctor_name VARCHAR(100) NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        type VARCHAR(50) DEFAULT 'consultation',
        notes TEXT,
        status VARCHAR(20) DEFAULT 'scheduled',
        duration INTEGER DEFAULT 30,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table created or already exists');

    // 2️⃣ Check if updated_at column exists
    const res = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='appointments' AND column_name='updated_at';
    `);

    if (res.rows.length === 0) {
      await client.query(`
        ALTER TABLE appointments
        ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
      `);
      console.log('✅ updated_at column added');
    } else {
      console.log('ℹ️ updated_at column already exists');
    }

    // 3️⃣ Optionally insert sample data if table is empty
    const countRes = await client.query('SELECT COUNT(*) as count FROM appointments;');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO appointments 
        (patient_name, phone_number, email, purpose, doctor_name, appointment_date, appointment_time, type, notes, status, duration)
        VALUES
        ('John Doe', '9876543210', 'john@example.com', 'General Checkup', 'Dr. Ravi Kumar', '2025-01-15', '10:30', 'consultation', 'First-time visit', 'scheduled', 30),
        ('Priya Sharma', '9123456789', 'priya@gmail.com', 'Fever and Headache', 'Dr. Meena Raj', '2025-01-15', '11:00', 'consultation', 'High fever for 2 days', 'confirmed', 30);
      `);
      console.log('✅ Sample appointments inserted');
    } else {
      console.log(`ℹ️ Appointments already exist: ${countRes.rows[0].count} records`);
    }

    console.log('🎉 Database setup complete!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
    console.log('🔒 Connection closed');
  }
};

// Run the setup
setupDatabase();
