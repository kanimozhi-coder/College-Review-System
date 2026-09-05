import express from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;
const colleges = [
  {
    id: 1,
    name: "ABC College",
    location: "Salem",
  },
  {
    id: 2,
    name: "XYZ College",
    location: "Chennai",
  },
];

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/colleges", (req, res) => {
  res.json(colleges);
});

app.get("/api/college/:id", (req, res) => {
  console.log(req.params.id);

  res.status(200).json({
    success: true,
    message: `Your id is ${req.params.id}`,
  });
});

app.get("/api/college", (req, res) => {
  console.log("Query", req.query.location);

  res.status(200).json({
    success: true,
    message: `Your query ${req.query.location}`,
  });
});

connectDB();

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
