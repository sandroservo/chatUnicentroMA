import { NextFunction, Request, Response } from "express";
import { HttpException } from "../interfaces/HttpException";
import { verify } from "jsonwebtoken";
import { IPayload } from "../interfaces/token.interface";

export function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const { authorization } = request.headers;
    if (!authorization) {
        throw new HttpException(401, 'Token Missing');
    }
    try {
        const [, token] = authorization.split(' ')

        const secretKey = process.env.TOKEN_SECRET
        if (!process.env.TOKEN_SECRET) {
            throw new HttpException(498, 'TOKEN_SECRET not found');
        }

        const { name, user_id, email } = verify(
            token,
            process.env.TOKEN_SECRET
        ) as IPayload;

        request.user_id = user_id;
        request.name = name;
        request.email = email;

        //console.log('🚀 ~ file: auth.middleware.ts: 24 ~ verify:', verifyToken)
        next()
    } catch (error) {
        throw new HttpException(401, "Token Expired");
    }
}