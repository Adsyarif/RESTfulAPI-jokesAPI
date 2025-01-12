import { Router } from "express";
import { getRandomJokes } from "../controllers/jokes";

const randomRouters = Router();

randomRouters.get("/", getRandomJokes);

export default randomRouters;
