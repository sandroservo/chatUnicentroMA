import { NextFunction, Request, Response, request } from "express";
import { HttpException } from "../interfaces/HttpException";

export function errorMiddleware (
    err: HttpException,
    request: Request,
    response: Response,
    next: NextFunction, 
){
    const status: number = err.status ?? 500
    const message: string = err.message ?? 'Internal server Error'

    response.status(status).json({
        message,
        status
    })
 }
    
