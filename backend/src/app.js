import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { env, isProd } from "./config/env.js";

export function createApp() {
  const app = express();

  // If in production behind a proxy (like Nginx), trust proxy headers
  if (isProd) {
    app.set("trust proxy", 1);
  }

  // Security headers
  app.use(helmet());

  // Protect from huge JSON payloads
  app.use(express.json({ limit: "20kb" }));

  // Logging (useful in Docker logs)
  app.use(morgan(isProd ? "combined" : "dev"));

  /**
   * CORS
   * Allow one or multiple origins: "http://localhost:5173,https://yourdomain.com"
   */
  const allowedOrigins = env.CORS_ORIGIN.split(",").map((s) => s.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        // If request has no "Origin" header (e.g. Postman, curl, server-to-server), allow it
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) return callback(null, true);

        return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
    }),
  );

  // Health route for checking container/API status
  app.get("/health", (req, res) => res.json({ status: "ok" }));

  // Versioned API
  app.use("/api/v1/tasks", taskRoutes);

  // 404 + error middleware
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
