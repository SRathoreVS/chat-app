//Express for API , routes , middleware
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import exp from "constants";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//auth
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      express.static(path.join(__dirname, "../frontend", "build", "index.html"))
    );
  });
}

server.listen(PORT, () => {
  console.log("Server is running on port : 5001");
  connectDB();
});
