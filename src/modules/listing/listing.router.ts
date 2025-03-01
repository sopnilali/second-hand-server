import express from 'express'
import { ListingController } from './listing.controller';
import { parseBody } from '../../middlewares/bodyParser';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ListValidationSchema } from './listing.validation';

const router = express.Router();


router.post('/', auth(USER_ROLE.user), multerUpload.fields([{name: 'images'}]), parseBody, validateRequest(ListValidationSchema.createListingValidationSchema), ListingController.createListing);
router.get('/', ListingController.GetAllListing);
router.get('/:id', ListingController.getSingleListing);
router.put('/:id', auth(USER_ROLE.user),  multerUpload.fields([{name: 'images'}]), parseBody, validateRequest(ListValidationSchema.updateListingValidationSchema), ListingController.updateListing)
router.delete('/:id', auth(USER_ROLE.user), ListingController.deleteListing)


export const listingRoutes = router;