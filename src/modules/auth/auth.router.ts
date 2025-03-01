import express from 'express';
import { AuthController } from './auth.controller';
import { UserController } from '../user/user.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { authValidationSchema } from '../user/user.validation';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

router.post('/register', validateRequest(authValidationSchema.createUserValidationSchema), UserController.createUser)
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.UserLogout);
router.post('/refresh-token', AuthController.refreshToken)
router.post('/changed-password', auth(USER_ROLE.admin), auth(USER_ROLE.user), AuthController.changePassword)
// router.post('/forget-password', auth(USER_ROLE.admin, USER_ROLE.user), AuthController.forgetPassword)
// router.post('/rest-password', auth(USER_ROLE.admin, USER_ROLE.user), AuthController.restPassword)


export const authRoutes = router;