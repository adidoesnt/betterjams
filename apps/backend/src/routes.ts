import { Express, Request, Response } from 'express';
import { MSG } from './constants/message';

export function initRoutes(app: Express) {
    app.get('/', (_: Request, response: Response) => {
        const { status, message } = MSG.OK;
        return response.status(status).json({
            message
        });
    });
}
