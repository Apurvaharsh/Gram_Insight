import express from "express"
import { protect } from '../middleware/auth.middleware.js'
import { generateDevelopmentPlan } from "../controllers/ai.controllers.js"

const router = express.Router()

router.get("/:id/ai-plan",protect,generateDevelopmentPlan)

export default router