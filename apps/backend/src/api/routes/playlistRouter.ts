import { playlistController } from 'api/controllers/userController';
import { tokenMiddleware } from 'api/middleware/token';
import { RequestWithToken } from 'constants/express';
import { Request, Response, Router } from 'express';

const router = Router();

router.use(tokenMiddleware);

router.get('/tracks', async (request: Request, response: Response) => {
    await playlistController(request as RequestWithToken, response);
});

export default router;
