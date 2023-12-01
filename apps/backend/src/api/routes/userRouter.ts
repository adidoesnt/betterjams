import { profileController } from 'api/controllers/userController';
import { tokenMiddleware } from 'api/middleware/token';
import { RequestWithToken } from 'constants/express';
import { Request, Response, Router } from 'express';

const router = Router();

router.use(tokenMiddleware);

router.get(
    '/me',
    tokenMiddleware,
    async (request: Request, response: Response) => {
        await profileController(request as RequestWithToken, response);
    }
);

export default router;
