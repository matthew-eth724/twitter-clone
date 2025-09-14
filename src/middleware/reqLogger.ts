import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} - ${req.url} @${new Date().toISOString()}`);
    next();
};

export default requestLogger;
