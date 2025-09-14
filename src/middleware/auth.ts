import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        throw error;
        next();
    }
};

export default auth;
