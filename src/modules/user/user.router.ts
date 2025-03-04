import express from 'express'
import {  UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { authValidationSchema } from './user.validation';

const router = express.Router();
router.get('/', UserController.GetUsers)
router.put('/:id', auth(USER_ROLE.user, USER_ROLE.admin), validateRequest(authValidationSchema.updateUserValidationSchema), UserController.updateUserContent)
router.get('/:id', UserController.getUserById)
router.delete('/:id', UserController.deleteUser)

export const userRoutes = router;