import { Router } from 'express';
import { createUser, login, detailUser, deleteUser } from '../controllers/user-controller.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.route('/')
    .post(createUser)
    .get(auth, detailUser)
    .delete(auth, deleteUser);

router.route('/login').post(login)

export default router;