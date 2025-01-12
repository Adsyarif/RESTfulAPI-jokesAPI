import { Router } from "express";
import { filterJokes } from "../controllers/jokes";

const filter = Router();

filter.get("/", filterJokes);

export default filter;
