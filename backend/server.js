import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import villageRoutes from "./routes/village.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import forecastRoutes from "./routes/forecast.routes.js";

const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/villages", aiRoutes);
app.use("/api/villages/", forecastRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.send("app is running");
});

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
