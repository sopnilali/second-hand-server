import express from 'express'
import { wishControllers } from './wish.controller';

const router = express.Router();


router.post('/', wishControllers.createWishe)
router.get('/', wishControllers.getAllWishes)
router.get('/:id', wishControllers.getSingleWish)
router.delete('/:id', wishControllers.deleteWish)

export const wisheRoutes =  router;