import { StorageRepository } from "@/infra/storage";
import { ConflictError } from "@/utils/httpErrors";

const repository = new StorageRepository()

async function getImageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (typeof handlerProps?.parameters !== 'string') return {
    statusCode: 400
  }
  const url = await repository.getImage(handlerProps.parameters)
  if (!url) {
    return { statusCode: 204 }
  }
  return {
    body: { url },
    statusCode: 200
  }
}

async function uploadImageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (typeof handlerProps?.parameters !== 'string') return {
    statusCode: 400
  }

  try {
    const result = await repository.uploadImage(handlerProps.parameters)
    return {
      statusCode: 201, body: {
        url: result.url,
        public_id: result.public_id,
      }
    }
  } catch (error) {
    if (error instanceof Error)
      throw new ConflictError(error.message)
  }
}

async function deleteImageHandler(handlerProps?: HandlerProps): ControllerResponse {
  if (typeof handlerProps?.parameters !== 'string') return {
    statusCode: 400
  }

  await repository.deleteImage(handlerProps.parameters)
  return { statusCode: 204 }
}

export {
  deleteImageHandler,
  getImageHandler,
  uploadImageHandler
};

