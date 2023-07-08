import { StorageRepository } from "@/infra/storage";
import { ConflictError, HttpError } from "@/utils/httpErrors";

const repository = new StorageRepository()

async function getImageHandler(handlerProps?: HandlerProps): ControllerResponse {
  const field = Object.keys(handlerProps?.parameters!).find(e => e === 'publicId')
  const publicId = Object.values(handlerProps?.parameters!)[0]

  if (!field || !publicId) return {
    statusCode: 400
  }

  const url = await repository.getImage(publicId)
  if (!url) {
    return { statusCode: 204 }
  }
  return {
    body: { url },
    statusCode: 200
  }
}

async function uploadImageHandler(handlerProps?: HandlerProps): ControllerResponse {
  const file = Object.values(handlerProps?.parameters!)[0]

  if (!Object.keys(handlerProps?.parameters!).find(key => key === 'file') || !file) return {
    statusCode: 400
  }

  try {
    const result = await repository.uploadImage(file.path)
    return {
      statusCode: 201, body: {
        url: result.url,
        publicId: result.public_id,
      }
    }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)

    if (typeof error === 'object')
      throw new HttpError(JSON.stringify(error), 500)
  }
}

async function deleteImageHandler(handlerProps?: HandlerProps): ControllerResponse {
  const field = Object.keys(handlerProps?.parameters!).find(e => e === 'publicId')
  const publicId = Object.values(handlerProps?.parameters!)[0]

  if (!field || !publicId) return {
    statusCode: 400
  }

  await repository.deleteImage(publicId)
  return { statusCode: 204 }
}

export {
  deleteImageHandler,
  getImageHandler,
  uploadImageHandler
};

