import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const port = 4030;

const connection = new Pool({
  user: "postgres",
  host: "localhost",
  password: "admin",
  database: "postgres",
  port: "5432",
});

connection
  .connect()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get("/data-point", async (req, res) => {
    try {
      const data = await connection.query("select * from geodata.data");

      res.send({
        data: data.rows[1].geo,
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  });

  app.get("/data-polygon", async (req, res) => {
    try {
      const data = await connection.query("select * from geodata.data");

      res.send({
        data: data.rows[0].geo,
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  });

  app.listen(port, () => {
    console.log(`Running a API server at http://localhost:${port}/`);
  });
};

main().catch((err) => {
  console.log(err);
});
