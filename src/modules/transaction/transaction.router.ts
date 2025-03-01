import express from 'express'
import { transactionController } from './transaction.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();



router.get('/transactions', transactionController.getAllTransactions)
router.post('/transactions', auth(USER_ROLE.user), transactionController.createTransation)
router.put('/transactions/:id', auth(USER_ROLE.user), transactionController.updateTransactionStatus)
router.get('/sales/:userId', transactionController.getSalesById)
router.get('/purchases/:userId', transactionController.getPurchasesById)






export const transactionRoutes = router;



