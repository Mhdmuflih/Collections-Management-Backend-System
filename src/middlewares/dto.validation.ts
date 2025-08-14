import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";

export const dtoValidationMiddleware = (DTO: any) => async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(DTO, req.body);
    const errors = await validate(dtoObj);
    if(errors.length > 0) {
        const message = errors.map(err => Object.values(err.constraints || {})).flat();
        return res.status(HTTP_STATUS.BAD_REQUEST).json({errors: message})
    }
    req.body = dtoObj;
    next();
}