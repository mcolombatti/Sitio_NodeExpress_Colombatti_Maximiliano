import express from "express";

import controller from "../controllers/controller.js";

const router = express.Router();

router.get("/", controller.view);
router.get("/testimonio", controller.formNewTestimonial);
router.post("/testimonio", controller.createTestimonial);
router.get("/testimonios", controller.view);

export default router;
