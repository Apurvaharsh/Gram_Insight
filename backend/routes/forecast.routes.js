import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { generateForecast } from '../controllers/forecast.controllers.js'

const router = express.Router()

router.get("/:id/forecast",protect,generateForecast)

export default router