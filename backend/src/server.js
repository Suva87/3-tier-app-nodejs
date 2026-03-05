import mongoose from "mongoose";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

async function start() {
  // Connect DB first (fail fast if DB is unavailable)
  await connectDB(env.MONGO_URI);

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`✅ API running on http://localhost:${env.PORT}`);
  });

  // Graceful shutdown (important for Docker stop/restart)
  async function shutdown(signal) {
    console.log(`🛑 Received ${signal}. Shutting down gracefully...`);

    server.close(async () => {
      await mongoose.connection.close();
      console.log("✅ Closed HTTP server and MongoDB connection");
      process.exit(0);
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT")); // Ctrl + C
  process.on("SIGTERM", () => shutdown("SIGTERM")); // Docker stop
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
