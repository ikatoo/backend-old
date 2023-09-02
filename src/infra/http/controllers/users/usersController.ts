import { UsersRepository } from "@/infra/db/PgPromise/Users";
import NodeMailerImplementation from "@/infra/mailer";
import { Email, PartialUserSchema, UserSchema } from "@/repository/IUser";
import { env } from "@/utils/env";
import { ConflictError, InternalError } from "@/utils/httpErrors";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";

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

  const alredyExists = !!(await usersRepository.getUserByEmail(validUser.data.email))
  if (alredyExists) throw new ConflictError('This email already exists')

  const { id: _, ...userWithoutID } = validUser.data
  const { id } = await usersRepository.createUser(userWithoutID)
  const accessToken = sign(
    { id },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return { statusCode: 201, body: { accessToken } }
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
  const body = !!user ? {
    id: user.id,
    name: user.name,
    email: user.email,
  } : undefined

  return { statusCode: 200, body }
}

async function findUsersByName(handlerProps?: HandlerProps): ControllerResponse {
  const validParameter = Object.keys(handlerProps?.parameters!).includes('partialName')
  const partialName = `${Object.values(handlerProps?.parameters!)[0]}`
  if (!partialName.length || !validParameter) throw new ConflictError('Invalid parameters.')

  const users = await usersRepository.findUsersByName(`${partialName}`)

  return { statusCode: 200, body: users }
}

async function passwordRecovery(handlerProps?: HandlerProps): ControllerResponse {
  const validParameter = Object.keys(handlerProps?.parameters!).includes('email')
  const email = `${Object.values(handlerProps?.parameters!)[0]}`
  const validEmail = Email.safeParse(email)
  const user = await usersRepository.getUserByEmail(email)

  if (!email || !validParameter || !validEmail.success || !user?.id)
    throw new ConflictError('Invalid parameters.')

  const newPassword = randomBytes(8).toString('hex')
  await usersRepository.updateUser(user.id, { password: newPassword })

  const mailer = new NodeMailerImplementation()
  const { accepted } = await mailer.send({
    from: 'iKatoo',
    to: email,
    subject: 'Recovery password',
    message: `Your new password is: ${newPassword}`
  })

  if (!accepted) throw new InternalError()

  return { statusCode: 204 }
}

export {
  createUser,
  deleteUser,
  findUsersByName,
  getUserByEmail,
  listUsers,
  passwordRecovery,
  updateUser
}
