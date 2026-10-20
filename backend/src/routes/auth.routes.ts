import { Router } from "express";
import { register, login, logout } from "../controllers/user.controllers.js";
import { validateAccesToken } from "../middlewares/validateToken.js";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", validateAccesToken, logout);

export default router;
