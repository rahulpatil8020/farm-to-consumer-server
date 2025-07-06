import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1", routes);

// Catch-all for undefined routes
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      type: "NotFoundError",
      message: "Route not found",
    },
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
