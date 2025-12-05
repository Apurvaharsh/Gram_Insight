import express from "express"
import { createVillage,getVillageById,getVillages,updateVillage,deleteVillage,approveVillage } from "../controllers/village.controllers.js"
import { protect } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/",protect,getVillages)
router.post("/",protect,createVillage)
router.put("/:id",protect,updateVillage)
router.get("/:id",protect,getVillageById)
router.delete("/:id",protect,admin,deleteVillage)
router.put("/:id/approve",protect,admin,approveVillage)

export default router