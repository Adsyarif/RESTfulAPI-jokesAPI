import { Router } from "express";
import {
  addNewJoke,
  editJokes,
  getSpecificJoke,
  replaceJokes,
  deleteJoke,
  deleteAllJokes,
} from "../controllers/jokes";

const jokesRoutes = Router();

jokesRoutes.get("/:id", getSpecificJoke);
jokesRoutes.post("/", addNewJoke);
jokesRoutes.put("/:id", replaceJokes);
jokesRoutes.patch("/:id", editJokes);
jokesRoutes.delete("/all", deleteAllJokes);
jokesRoutes.delete("/:id", deleteJoke);

export default jokesRoutes;
