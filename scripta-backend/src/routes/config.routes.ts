import { Router } from "express";
import { config, putConfig } from "../controllers/config.controllers";

export const configRouter = Router();

configRouter.get('/:id',  config);
configRouter.put('/update', putConfig)
