import { StorageRepository } from "@/infra/storage";
import { ConflictError, HttpError } from "@/utils/httpErrors";

const repository = new StorageRepository()

async function getImageHandler(handlerProps?: HandlerProps<{ id: string }>): ControllerResponse {
  const publicId = handlerProps?.parameters?.data?.id

  if (!publicId) return {
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

async function uploadImageHandler(handlerProps?: HandlerProps<{ path: string }>): ControllerResponse {
  const path = handlerProps?.parameters?.data?.path

  if (!path) return {
    statusCode: 400
  }

  try {
    const result = await repository.uploadImage(path)
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

async function deleteImageHandler(handlerProps?: HandlerProps<{ id: string }>): ControllerResponse {
  const publicId = handlerProps?.parameters?.data?.id

  if (!publicId) return {
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

