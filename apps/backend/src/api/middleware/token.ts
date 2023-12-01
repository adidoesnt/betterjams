import { ERR } from 'constants/error';
import { NextFunction, Request, Response } from 'express';

export const tokenMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { headers } = request;
    const { authorization } = headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        const { status, message } = ERR.MISSING_TOKEN;
        return response.status(status).json({
            message
        });
    }
    (request as Request & { token: string }).token = token;
    next();
};
