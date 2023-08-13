import { UsersRepository } from "@/infra/db/PgPromise/Users";
import { AuthSchema } from "@/repository/IAuth";
import { env } from "@/utils/env";
import { compareHash } from "@/utils/hasher";
import { BadRequestError, HttpError, UnauthorizedError } from "@/utils/httpErrors";
import { sign } from "jsonwebtoken";

const usersRepository = new UsersRepository();

async function authentication(handlerProps: HandlerProps): ControllerResponse {
  const validParameters = AuthSchema.safeParse(handlerProps.parameters)
  if (!validParameters.success)
    throw new BadRequestError('Invalid parameters')

  const { email, password } = validParameters.data
  const userExists = await usersRepository.getUserByEmail(email)
  const verify = await compareHash(password, userExists?.password ?? '')

  if (!verify) throw new UnauthorizedError('Invalid email or password')

  const accessToken = sign(
    { id: userExists?.id },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return { statusCode: 200, body: { accessToken } }

}

export {
  authentication
};
