import { Express, Request, Response } from 'express';
import { MSG } from 'constants/message';
import { default as authRouter } from 'api/routes/authRouter';
import { default as userRouter } from 'api/routes/userRouter';
import { default as playlistRouter } from 'api/routes/playlistRouter';

export function initRoutes(app: Express) {
    app.get('/', (_: Request, response: Response) => {
        const { status, message } = MSG.OK;
        return response.status(status).json({
            message
        });
    });
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/playlist', playlistRouter);
}
