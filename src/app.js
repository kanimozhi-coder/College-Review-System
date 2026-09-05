import express from "express";
import "dotenv/config";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/college", (req, res) => {
  res.json({
    message: "College Review API is running",
    name: "Ksr college",
    university: "periyar university",
  });
});

app.post("/create-college", (req, res) => {
  console.log("body", req.body);

  res.json({
    message: "College Review API is running",
  });
});

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
