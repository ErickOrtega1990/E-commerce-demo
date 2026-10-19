import express, { type Express } from "express";
import "dotenv/config";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import router from "./routes/index.js";

const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()),
  credentials: true,
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(",").map((h) =>
    h.trim(),
  ),
  methods: process.env.CORS_METHODS?.split(",").map((m) => m.trim()),
  maxAge: 600,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    status: 429,
    error: "Demasiadas peticiones, inténtalo más tarde",
  },
});

export const app: Express = express();

const appInit = () => {
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(limiter);
  app.use(express.json({ limit: "5kb" }));
  app.use("/api", router);
};

export default appInit;
