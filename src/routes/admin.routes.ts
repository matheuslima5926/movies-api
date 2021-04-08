import { Router } from 'express';

import { CreateAdminController, UpdateAdminController, DeleteAdminController} from '../controllers/users';
import { adminAuthenticatedMiddleware } from '../middlewares';

const adminRouter = Router();
const createAdminController = new CreateAdminController();
const updateAdminController = new UpdateAdminController();
const deleteAdminController = new DeleteAdminController();

adminRouter.post('/', adminAuthenticatedMiddleware, createAdminController.create);
adminRouter.put('/:id', adminAuthenticatedMiddleware, updateAdminController.update);
adminRouter.delete('/:id', adminAuthenticatedMiddleware, deleteAdminController.delete);

export default adminRouter;
