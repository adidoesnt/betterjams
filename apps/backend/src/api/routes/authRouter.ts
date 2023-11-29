import {
    loginController,
    redirectController,
    successController
} from 'api/controllers/authController';
import { Response, Request, Router } from 'express';

const router = Router();

router.use(
    '/login',
    async (request: Request, response: Response) =>
        await loginController(request, response)
);

router.use('/redirect', async (request: Request, response: Response) =>
    redirectController(request, response)
);

router.use('/success', (request: Request, response: Response) =>
    successController(request, response)
);

export default router;
