import { UsersRepository } from "@/infra/db/PgPromise/Users";
import NodeMailerImplementation from "@/infra/mailer";
import { PartialUserSchema, User, UserSchema } from "@/repository/IUser";
import { Email, EmailSchema } from "@/types/custom";
import { env } from "@/utils/env";
import { ConflictError, InternalError } from "@/utils/httpErrors";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";

const usersRepository = new UsersRepository();

async function listUsers(): ControllerResponse {
  const users = await usersRepository.listUsers()

  return {
    body: [...users],
    statusCode: 200
  }
}

async function createUser(handlerProps?: HandlerProps<Omit<User, 'id'>>): ControllerResponse {
  const user = handlerProps?.parameters?.data
  const validUser = UserSchema.safeParse(user)
  if (!validUser.success)
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

async function updateUser(handlerProps?: HandlerProps<Partial<User> & { id: number }>): ControllerResponse {
  const user = handlerProps?.parameters?.data
  const validUser = PartialUserSchema.safeParse(user)
  if (!validUser.success || !validUser.data.id)
    throw new ConflictError('Invalid parameters.')

  const { id, ...data } = validUser.data
  await usersRepository.updateUser(id, data)

  return {
    statusCode: 204
  }
}

async function deleteUser(handlerProps?: HandlerProps<{ id: number }>): ControllerResponse {
  const id = handlerProps?.parameters?.data?.id
  if (!id) throw new ConflictError('Invalid parameters.')

  await usersRepository.deleteUser(+id)
  return { statusCode: 204 }
}

async function getUserByEmail(handlerProps?: HandlerProps<{ email: Email }>): ControllerResponse {
  const email = handlerProps?.parameters?.data?.email
  if (!email) throw new ConflictError('Invalid parameters.')
  const user = await usersRepository.getUserByEmail(email)
  const body = !!user ? {
    id: user.id,
    name: user.name,
    email: user.email,
  } : undefined

  return { statusCode: 200, body }
}

async function findUsersByName(handlerProps?: HandlerProps<{ partialName: string }>): ControllerResponse {
  const partialName = handlerProps?.parameters?.data?.partialName
  if (!partialName) throw new ConflictError('Invalid parameters.')

  const users = await usersRepository.findUsersByName(`${partialName}`)

  return { statusCode: 200, body: users }
}

async function passwordRecovery(handlerProps?: HandlerProps<{ email: Email }>): ControllerResponse {
  const email = handlerProps?.parameters?.data?.email
  const validEmail = EmailSchema.safeParse(email)
  if (!validEmail.success)
    throw new ConflictError('Invalid parameters.')

  const user = await usersRepository.getUserByEmail(validEmail.data)

  if (!user?.id)
    throw new ConflictError('Invalid parameters.')

  const newPassword = randomBytes(8).toString('hex')
  await usersRepository.updateUser(user.id, { password: newPassword })

  const mailer = new NodeMailerImplementation()
  const { accepted } = await mailer.send({
    from: 'iKatoo',
    to: validEmail.data,
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
};

