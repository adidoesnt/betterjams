import {
    loginController,
    redirectController,
    tokenController
} from 'api/controllers/authController';
import { Response, Request, Router } from 'express';

const router = Router();

router.get(
    '/login',
    async (request: Request, response: Response) =>
        await loginController(request, response)
);

router.get('/redirect', async (request: Request, response: Response) =>
    redirectController(request, response)
);

router.get('/token', async (request: Request, response: Response) => {
    await tokenController(request, response);
});

export default router;
