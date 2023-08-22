import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { AuthSchema } from "@/repository/IAuth";
import { User } from "@/repository/IUser";
import { env } from "@/utils/env";
import { compareHash } from "@/utils/hasher";
import { BadRequestError, UnauthorizedError } from "@/utils/httpErrors";
import { sign, verify } from "jsonwebtoken";

const usersRepository = new UsersRepository();

async function authentication(handlerProps?: HandlerProps): ControllerResponse {
  const validParameters = AuthSchema.safeParse(handlerProps?.parameters)
  if (!validParameters.success)
    throw new BadRequestError('Invalid parameters')

  const { email, password } = validParameters.data
  try {
    const userExists = await usersRepository.getUserByEmail(email)
    const verify = await compareHash(password, userExists?.password ?? '')

    if (!verify) throw new Error()

    const accessToken = sign(
      { id: userExists?.id },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return { statusCode: 200, body: { accessToken } }
  } catch (error) {
    throw new UnauthorizedError('Invalid email or password')
  }

  return { statusCode: 500 }
}

const verifyToken = async (handlerProps?: HandlerProps): ControllerResponse => {
  const parameters = handlerProps?.parameters ?? {}
  const token = `${Object.values(parameters)[0]}`

  try {
    const { id } = verify(token, env.JWT_SECRET) as { id: number }
    const user = await usersRepository.getUserByID(id) as User

    if (!user)
      throw new Error()
  } catch {
    throw new UnauthorizedError('Unauthorized')
  }

  return { statusCode: 200 }
}

export {
  authentication,
  verifyToken
};
