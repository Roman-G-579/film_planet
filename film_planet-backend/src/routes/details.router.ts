import { Router } from "express";
import {
    getItem,
    getPersonDetails,
    getSeasonDetails
} from "../controllers/details.controller";

const router = Router();

router.get('/film/:id', getItem);

router.get('/tv/:id', getItem);

router.get('/tv/:series_id/season/:season_number', getSeasonDetails);

router.get('/person/:id', getPersonDetails);

export default router;
