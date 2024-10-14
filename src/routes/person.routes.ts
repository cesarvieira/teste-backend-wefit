import { Router } from "express";
import personController from "../controllers/person.controller";

const router = Router();

router.get("/", personController.get);
router.post("/", personController.create);
router.put("/:id", personController.update);
router.delete("/:id", personController.remove);

export default router;
