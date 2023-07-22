import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { PartialUserSchema, UserSchema } from "@/repository/IUser";
import { ConflictError } from "@/utils/httpErrors";

const usersRepository = new UsersRepository();

async function listUsers(): ControllerResponse {
  const users = await usersRepository.listUsers()
  if (!users.length) {
    return { statusCode: 204 }
  }
  return {
    body: users,
    statusCode: 200
  }
}

async function createUser(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const valid = UserSchema.safeParse(handlerProps?.parameters)
  if (!valid.success)
    throw new ConflictError('Invalid parameters.')
  try {
    await usersRepository.createUser(valid.data)
    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
  }
}

async function updateUser(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }

  const valid = PartialUserSchema.safeParse(handlerProps?.parameters)
  if (!valid.success || Object.keys(valid.data).length === 0)
    throw new ConflictError('Invalid parameters.')
  try {
    await usersRepository.updateUser(parseInt(`${valid.data.id}`), valid.data)
    return {
      statusCode: 204
    }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
  }
}

async function deleteUser(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }
  const valid = PartialUserSchema.safeParse(handlerProps?.parameters)
  if (!valid.success || Object.keys(valid.data).length === 0)
    throw new ConflictError('Invalid parameters.')

  await usersRepository.deleteUser(parseInt(`${valid.data.id}`))
  return { statusCode: 204 }
}

async function getUserByEmail(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }
  const valid = PartialUserSchema.safeParse(handlerProps?.parameters)
  if (!valid.success || Object.keys(valid.data).length === 0 || !valid.data.email)
    throw new ConflictError('Invalid parameters.')

  await usersRepository.getUserByEmail(valid.data.email)
  return { statusCode: 204 }
}

async function findUsersByName(handlerProps?: HandlerProps): ControllerResponse {
  if (!Object.keys(handlerProps?.parameters!).length) return {
    statusCode: 400
  }
  // const valid = PartialUserSchema.safeParse(handlerProps?.parameters)
  // if (!valid.success || Object.keys(valid.data).length === 0 || !valid.data.name)
  const parameters = handlerProps?.parameters
  // if (!parameters.includes('partialName'))
  //   throw new ConflictError('Invalid parameters.')

  // const partialName = Object.values(handlerProps.parameters)[0]
  // await usersRepository.findUsersByName(partialName)
  return { statusCode: 204 }
}

export {
  createUser, deleteUser, listUsers, updateUser, getUserByEmail, findUsersByName
};

