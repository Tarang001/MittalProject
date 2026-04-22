import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load env
dotenv.config();
dotenv.config({ path: "../.env" });

// Dynamic imports (kept from your structure)
const { default: apiRoutes } = await import("./routes/index.js");
const { requestLogger } = await import("./middlewares/requestLogger.js");
const { errorHandler } = await import("./middlewares/errorHandler.js");
const { sendError } = await import("./utils/response.js");
const { env } = await import("./config/env.js");

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// CORS CONFIG
// ======================
const allowedOrigins = [
  "http://localhost:5173", // local dev (Vite)
  "https://mittalproject-1.onrender.com", // your frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(requestLogger);

// ======================
// HEALTH CHECK
// ======================
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

// ======================
// ROOT ROUTE (IMPORTANT)
// ======================
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Backend API is running 🚀",
  });
});

// ======================
// API ROUTES
// ======================
app.use("/api", apiRoutes);

// Handle unknown API routes
app.use(/^\/api\/.*/, (_req, res) =>
  sendError(res, "API route not found.", 404)
);

// ======================
// ERROR HANDLER
// ======================
app.use(errorHandler);

// ======================
// BOOTSTRAP
// ======================
async function bootstrap() {
  try {
    // Optional: seed admin user (only in production)
    if (env.NODE_ENV === "production" && env.DATABASE_ENABLED) {
      const { ensureDefaultAdminUser } = await import(
        "./services/authService.js"
      );
      await ensureDefaultAdminUser();
      console.log("[startup] Default admin ensured.");
    } else {
      console.log("[startup] Skipping admin seed.");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
