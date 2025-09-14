import { Response } from "express";

export const responseBody = (res: Response, msg: string, data: any, status: number) => {
    return res.status(status).json({
        msg: msg,
        data: data
    });
};

export const response = (res: Response, msg: string, status: number) => {
    return res.status(status).json({
        msg: msg
    });
};

export default {
    responseBody, response
};
