import { expressAdapter } from "@/infra/http/adapters/expressAdapter";
import { usersController } from "@/infra/http/controllers";
import { Router } from "express";

const usersRoutes = Router()

usersRoutes.put(
  '/user',
  (_request, response) => response.status(405).send()
)

usersRoutes.get(
  '/users',
  expressAdapter(usersController.listUsers)
)

usersRoutes.get(
  '/user/email/:email',
  expressAdapter(usersController.getUserByEmail)
)

usersRoutes.get(
  '/user/name/:partialName',
  expressAdapter(usersController.findUsersByName)
)

usersRoutes.post(
  '/user',
  expressAdapter(usersController.createUser)
)

usersRoutes.patch(
  '/user',
  expressAdapter(usersController.updateUser)
)

usersRoutes.delete(
  '/user/id/:id',
  expressAdapter(usersController.deleteUser)
)

export { usersRoutes };
