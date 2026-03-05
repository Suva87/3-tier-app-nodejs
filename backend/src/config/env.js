import dotenv from "dotenv";

dotenv.config();
// Loads .env values into process.env (only in Node runtime)

function mustGet(key) {
  const value = process.env[key]; // dynamic access
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),

  // Required: app should FAIL FAST if missing
  MONGO_URI: mustGet("MONGO_URI"),

  // For CORS (can be single or comma-separated)
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
};

export const isProd = env.NODE_ENV === "production";
