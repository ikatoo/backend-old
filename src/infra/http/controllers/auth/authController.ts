import { TokenBlacklistRepository } from "@/infra/db/PgPromise/TokenBlacklist";
import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { Auth, AuthSchema } from "@/repository/IAuth";
import { env } from "@/utils/env";
import { compareHash } from "@/utils/hasher";
import { BadRequestError, ConflictError, UnauthorizedError } from "@/utils/httpErrors";
import { sign, verify } from "jsonwebtoken";

const usersRepository = new UsersRepository();
const tokenBlacklistRepository = new TokenBlacklistRepository()

async function authentication(handlerProps?: HandlerProps<Auth>): ControllerResponse {
  const validParameters = AuthSchema.safeParse(handlerProps?.parameters?.data)
  if (!validParameters.success)
    throw new BadRequestError('Invalid parameters')

  const { email, password } = validParameters.data
  try {
    const userExists = await usersRepository.getUserByEmail(email)
    if (!userExists) throw new Error()
    const { password: hash, ...user } = userExists
    const verify = await compareHash(`${password}`, hash ?? '')

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
  const token = handlerProps?.parameters?.authorization?.replace('Bearer ', '')

  try {
    if (!token) throw new Error()
    const payload = verify(token, env.JWT_SECRET)
    if (!(typeof payload === 'object' && 'id' in payload))
      throw new Error()

    const result = await usersRepository.getUserByID(payload.id)
    if (!result)
      throw new Error()
    const { password: _, ...user } = result
    const isBlacklisted = await tokenBlacklistRepository.isBlacklisted(token)

    if (!user || isBlacklisted)
      throw new Error()

    return { statusCode: 200, body: { user } }
  } catch {
    throw new UnauthorizedError('Unauthorized')
  }

}

const signout = async (handlerProps?: HandlerProps<{ token: string }>): ControllerResponse => {
  const token = handlerProps?.parameters?.authorization
  if (!token) throw new BadRequestError('Invalid parameters')

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
  authentication, signout, verifyToken
};

