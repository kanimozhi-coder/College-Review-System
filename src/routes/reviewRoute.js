import express from "express";
import { createReview, deleteReview, getReview, getReviews, updateReview } from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/reviews", getReviews);
router.get("/reviews/:id", getReview);

router.post("/reviews", protect, authorize(["student", "teacher"]), createReview);
router.put("/reviews/:id", protect, authorize("student", "teacher", "admin"), updateReview);
router.delete("/reviews/:id", protect, authorize("admin"), deleteReview);

export default router;
