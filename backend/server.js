const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log("Request:", req.method, req.url);
    next();
});

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "elite_drive"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully!");
});

// Test route
app.get("/", (req, res) => {
    res.send("EliteDrive Backend is running!");
});
// Sign Up
app.post("/api/signup", (req, res) => {
    const { full_name, email, phone, password } = req.body;

    if (!full_name || !email || !phone || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Encrypt password before saving it
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {

        if (hashErr) {
            console.error(hashErr);

            return res.status(500).json({
                message: "Password encryption failed"
            });
        }

        const sql = `
            INSERT INTO users (full_name, email, phone, password)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [full_name, email, phone, hashedPassword],
            (err, result) => {

                if (err) {
                    console.error(err);

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            message: "Email already exists"
                        });
                    }

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                res.status(201).json({
                    message: "Account created successfully",
                    userId: result.insertId
                });
            }
        );
    });
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});