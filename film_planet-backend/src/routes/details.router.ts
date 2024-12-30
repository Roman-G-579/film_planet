import { Router } from "express";
import {getItemMiddleware, getSeasonDetailsMiddleware} from "../controllers/details.controller";

const router = Router();

router.get('/:mediaType/:id', getItemMiddleware);

router.get('/tv/:series_id/season/:season_number', getSeasonDetailsMiddleware);

export default router;
