import express from 'express'
import { transactionController } from './transaction.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();



router.get('/transactions', transactionController.getAllTransactions)
router.get('/transactions/:id', transactionController.getSingleTransactions)
router.post('/transactions', auth(USER_ROLE.user), transactionController.createTransation)
router.put('/transactions/:id', auth(USER_ROLE.user), transactionController.updateTransactionStatus)
router.get('/sales/:userId', auth(USER_ROLE.user), transactionController.getSalesById)
router.get('/purchases/:userId', auth(USER_ROLE.user), transactionController.getPurchasesById)
router.delete('/transactions/:id', auth(USER_ROLE.user), transactionController.deleteTransaction)
router.get('/single-purchases-history/:id', auth(USER_ROLE.user), transactionController.getSinglePurchasesHistory)







export const transactionRoutes = router;



