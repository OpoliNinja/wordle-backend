import { Router } from "express"
import playerRoutes from "./player.routes"
import gameRoute from "./game.route"

const router = Router()

router.use("/players", playerRoutes)
router.use("/games", gameRoute)

export default router
