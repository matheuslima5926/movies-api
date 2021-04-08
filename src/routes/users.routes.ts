import { Router } from 'express';

import { CreateUserController, UpdateUserController, DeleteUserController} from '../controllers/users';

const userRouter = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRouter.post('/', createUserController.create);
userRouter.put('/:id', updateUserController.update);
userRouter.delete('/:id', deleteUserController.delete);

export default userRouter;
