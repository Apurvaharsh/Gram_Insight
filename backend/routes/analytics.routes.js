import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { getSummaryAnalytics,getPriorityRanking,getAmenitiesStatus } from "../controllers/analytics.controllers.js"

const router = express.Router()

router.get("/summary",protect,getSummaryAnalytics)
router.get("/amenities-status",protect,getAmenitiesStatus)
router.get("/priority-ranking",protect,getPriorityRanking)

export default router