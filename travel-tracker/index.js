import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// PostgreSQL Client Setup
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "22-Feb-05",
  port: 5432,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Function to Check Visited Countries
async function checkVisited() {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    return result.rows.map((row) => row.country_code);
  } catch (error) {
    console.error("Error fetching visited countries:", error);
    return [];
  }
}

// GET Home Route
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    res.render("index.ejs", { countries, total: countries.length });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST Add Route
app.post("/add", async (req, res) => {
  try {
    const input = req.body["country"];
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name = $1",
      [input]
    );

    if (result.rows.length !== 0) {
      const countryCode = result.rows[0].country_code;
      await db.query(
        "INSERT INTO visited_countries(country_code) VALUES ($1)",
        [countryCode]
      );
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
