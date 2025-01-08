import { Router } from "express";
import {
    getItemMiddleware,
    getPersonDetailsMiddleware,
    getSeasonDetailsMiddleware
} from "../controllers/details.controller";

const router = Router();

router.get('/:mediaType/:id', getItemMiddleware);

router.get('/tv/:series_id/season/:season_number', getSeasonDetailsMiddleware);

router.get('/person/:id', getPersonDetailsMiddleware);

export default router;
