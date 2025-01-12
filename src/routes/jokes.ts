import { Router } from "express";
import { getSpecificJoke } from "../controllers/jokes";

const jokesRoutes = Router();

jokesRoutes.get("/:id", getSpecificJoke);

export default jokesRoutes;
