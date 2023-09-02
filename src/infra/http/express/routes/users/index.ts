import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { usersController } from "@/infra/http/controllers";
import { Router } from "express";
import verifyTokenMiddleware from "../../middlewares/verifyTokenMiddleware";

const usersRoutes = Router()

usersRoutes.put(
  '/user',
  (_request, response) => response.status(405).send()
)

usersRoutes.get(
  '/users',
  verifyTokenMiddleware,
  expressAdapter(usersController.listUsers)
)

usersRoutes.get(
  '/user/email/:email',
  verifyTokenMiddleware,
  expressAdapter(usersController.getUserByEmail)
)

usersRoutes.get(
  '/users/name/:partialName',
  verifyTokenMiddleware,
  expressAdapter(usersController.findUsersByName)
)

usersRoutes.post(
  '/user',
  expressAdapter(usersController.createUser)
)

usersRoutes.patch(
  '/user',
  verifyTokenMiddleware,
  expressAdapter(usersController.updateUser)
)

usersRoutes.delete(
  '/user/id/:id',
  verifyTokenMiddleware,
  expressAdapter(usersController.deleteUser)
)

usersRoutes.post(
  '/user/password-recovery',
  expressAdapter(usersController.passwordRecovery)
)

export { usersRoutes };
