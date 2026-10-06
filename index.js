const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());

let connection = null;

async function query(sql, params = []) {
    if (connection === null) {
        console.log('Connecting to database...');

        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "CAMRYNMARTINEZ",
            password: "IXL5snO6smtLywvpNN8sMxdpioCAzscrXER",
            database: "CAMRYNMARTINEZ"
        });
    }

    const [results] = await connection.execute(sql, params);
    return results;
}

app.post("/api/sensor", async (req, res) => {

    console.log(req.body);

    const temperature = req.body.temperature;

    try {

        await query(
            "INSERT INTO pa3 (data) VALUES (?)",
            [temperature]
        );

        console.log("Temperature saved:", temperature);

        res.json({
            message: "Sensor data received and saved",
            temperature: temperature
        });

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            message: "Error saving temperature"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});