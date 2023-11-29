import { loginController } from 'api/controllers/authController';
import { Response, Request, Router } from 'express';

const router = Router();

router.use('/login', (request: Request, response: Response) =>
    loginController(request, response)
);

export default router;
