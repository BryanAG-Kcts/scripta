import { Router } from "express";
import {
	createBD,
	getConfig,
	putConfig,
	putDictionary,
	putPages,
} from "../controllers/config.controllers";

export const configRouter = Router();

configRouter.post("/", createBD);
configRouter.get("/:id", getConfig);
configRouter.put("/update", putConfig);
configRouter.put("/update-pages", putPages);
configRouter.put("/update-dictionary", putDictionary);
