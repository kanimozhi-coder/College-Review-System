import express from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/db.js";
import CollegeModel from "./models/college.js";
import authRoute from "./routes/authRoutes.js";
import collegeRoute from "./routes/collegeRoutes.js";
import cookieParser from "cookie-parser";
import reviewRoute from "./routes/reviewRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/", collegeRoute);
app.use("/api", reviewRoute);

connectDB();

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
