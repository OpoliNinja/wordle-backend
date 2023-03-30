import { Router } from "express"
import PlayerController from "../controllers/player.controller"
const router = Router()
const controller = new PlayerController()

router.route("/ranking").get(controller.getRanking)

export default router
