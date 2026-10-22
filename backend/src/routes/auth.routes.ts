import { Router } from "express";
import {
  register,
  login,
  logout,
  refreshSession,
} from "../controllers/user.controllers.js";
import {
  validateAccesToken,
  validateRefreshToken,
} from "../middlewares/validateToken.js";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", validateAccesToken, logout);
router.post("/refreshSession", validateRefreshToken, refreshSession);

export default router;
