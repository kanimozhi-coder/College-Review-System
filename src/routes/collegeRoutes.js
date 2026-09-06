import express from "express";
import { createCollege, deleteCollege, getColleges, getSingleCollege, updateCollege } from "../controllers/collegeController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/colleges", getColleges);
router.post("/colleges", protect, authorize("admin"), createCollege);
router.get("/colleges/:id", getSingleCollege);
router.put("/colleges/:id", protect, authorize("admin"), updateCollege);
router.delete("/college/:id", protect, authorize("admin"), deleteCollege);
export default router;
