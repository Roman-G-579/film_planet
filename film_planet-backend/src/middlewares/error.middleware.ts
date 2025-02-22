import {NextFunction, Request, Response} from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({
        message: err.message || "Something went wrong ☹️"
    });
};
