import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("AN ERROR OCCURED 😑", err);
    res.status(500).json({
        msg: err
    });
    next();
};

export default errorHandler;
