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
  const validParameter = Object.keys(handlerProps?.parameters!).includes('user')
  const user = Object.values(handlerProps?.parameters!)[0]
  const validUser = UserSchema.safeParse(user)
  if (!user || !validParameter || !validUser.success)
    throw new ConflictError('Invalid parameters.')

  await usersRepository.createUser(user)
  return { statusCode: 201 }
}

async function updateUser(handlerProps?: HandlerProps): ControllerResponse {
  const validParameter = Object.keys(handlerProps?.parameters!).includes('user')
  const user = Object.values(handlerProps?.parameters!)[0]
  const validUser = PartialUserSchema.safeParse(user)
  if (!user || !validParameter || !validUser.success)
    throw new ConflictError('Invalid parameters.')

  await usersRepository.updateUser(validUser.data.id ?? 0, validUser.data)

  return {
    statusCode: 204
  }
}

async function deleteUser(handlerProps?: HandlerProps): ControllerResponse {
  const validParameter = Object.keys(handlerProps?.parameters!).includes('id')
  const id = `${Object.values(handlerProps?.parameters!)[0]}`
  if (!id.length || !validParameter) throw new ConflictError('Invalid parameters.')

  await usersRepository.deleteUser(+id)
  return { statusCode: 204 }
}

async function getUserByEmail(handlerProps?: HandlerProps): ControllerResponse {
  const validParameter = Object.keys(handlerProps?.parameters!).includes('email')
  const email = `${Object.values(handlerProps?.parameters!)[0]}`
  if (!email.length || !validParameter) throw new ConflictError('Invalid parameters.')
  const user = await usersRepository.getUserByEmail(email)

  return { statusCode: 200, body: user }
}

async function findUsersByName(handlerProps?: HandlerProps): ControllerResponse {
  const validParameter = Object.keys(handlerProps?.parameters!).includes('partialName')
  const partialName = `${Object.values(handlerProps?.parameters!)[0]}`
  if (!partialName.length || !validParameter) throw new ConflictError('Invalid parameters.')

  const users = await usersRepository.findUsersByName(`${partialName}`)

  return { statusCode: 200, body: users }
}

export {
  createUser, deleteUser, listUsers, updateUser, getUserByEmail, findUsersByName
};

