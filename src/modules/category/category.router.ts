import express from 'express'
import { categoryController } from './category.controller'
import validateRequest from '../../middlewares/validateRequest'
import { categoryValidation } from './category.validation'
import { parseBody } from '../../middlewares/bodyParser'
import { multerUpload } from '../../config/multer.config'

const router = express.Router()

router.post('/', multerUpload.single('image'), parseBody, validateRequest(categoryValidation.createCategoryValidationSchema), categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.put('/:id', multerUpload.single('image'), parseBody, validateRequest(categoryValidation.updateCategoryValidationSchema), categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
router.get('/:id', categoryController.singleCategorybyId)

export const categoryRoute = router