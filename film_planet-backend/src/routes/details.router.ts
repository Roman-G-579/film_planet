import { Router } from "express";
import {getItemMiddleware} from "../controllers/details.controller";

const router = Router();

router.get('/:mediaType/:id', getItemMiddleware);

export default router;
