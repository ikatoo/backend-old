import { TokenBlacklistRepository } from "@/infra/db/PgPromise/TokenBlacklist";
import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { AuthSchema } from "@/repository/IAuth";
import { User } from "@/repository/IUser";
import { env } from "@/utils/env";
import { compareHash } from "@/utils/hasher";
import { BadRequestError, ConflictError, UnauthorizedError } from "@/utils/httpErrors";
import { sign, verify } from "jsonwebtoken";

const usersRepository = new UsersRepository();
const tokenBlacklistRepository = new TokenBlacklistRepository()

async function authentication(handlerProps?: HandlerProps): ControllerResponse {
  const validParameters = AuthSchema.safeParse(handlerProps?.parameters)
  if (!validParameters.success)
    throw new BadRequestError('Invalid parameters')

  const { email, password } = validParameters.data
  try {
    const userExists = await usersRepository.getUserByEmail(email)
    if (!userExists) throw new Error()
    const { password: hash, ...user } = userExists
    const verify = await compareHash(password, hash ?? '')

    if (!verify) throw new Error()

    const accessToken = sign(
      { id: userExists?.id },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return { statusCode: 200, body: { accessToken, user } }
  } catch {
    throw new UnauthorizedError('Unauthorized')
  }
}

const verifyToken = async (handlerProps?: HandlerProps): ControllerResponse => {
  const parameters = handlerProps?.parameters ?? {}
  const token = `${Object.values(parameters)[0]}`

  try {
    const { id } = verify(token, env.JWT_SECRET) as { id: number }
    const { password: _, ...user } = await usersRepository.getUserByID(id) as User
    const isBlacklisted = await tokenBlacklistRepository.isBlacklisted(token)

    if (!user || isBlacklisted)
      throw new Error()

    return { statusCode: 200, body: { user } }
  } catch {
    throw new UnauthorizedError('Unauthorized')
  }

}

const signout = async (handlerProps?: HandlerProps): ControllerResponse => {
  const parameters = handlerProps?.parameters ?? {}
  const token = `${Object.values(parameters)[0]}`

  try {
    const isBlacklisted = await tokenBlacklistRepository.isBlacklisted(token)
    if (isBlacklisted)
      throw new ConflictError('This token always blacklisted.')

    await tokenBlacklistRepository.add(token)
  } catch (error) {
    throw error
  }

  return { statusCode: 204 }
}

export {
  authentication,
  verifyToken,
  signout
};
