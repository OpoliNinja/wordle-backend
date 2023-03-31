import { Router } from "express"
import GameController from "../controllers/game.controller"
import authMiddleware from "../middlewares/auth.middleware"

const router = Router()
const controller = new GameController()

router.route("/current").post(authMiddleware, controller.play)

export default router
