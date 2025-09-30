import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.JWT_SECRET) {
  console.warn("[WARN] JWT_SECRET is not set. JWT operations will fail until it's provided in server/.env");
}

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get("/api/tasks", (req, res) => {
  res.status(200).send({ thongbao: "BAN CO 10 VIEC CAN LAM" });
});


app.post("/api/tasks", (req, res) => {
  res.send({ message: "Hello World" });
});

app.put("/api/tasks", (req, res) => {
  res.send({ message: "Hello World" });
});