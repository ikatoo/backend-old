import { PathItemObject } from "openapi3-ts/dist/oas30";
import { NoContent } from "../../responses/NoContent";
import { GetImageSwaggerResponse } from "../responses/GetImage";
import { UploadImageSwaggerResponse } from "../responses/UploadImage";
import { DeleteImageSwaggerSchema } from "../resquests/DeleteImage";
import { GetImageSwaggerSchema } from "../resquests/GetImage";
import { UploadImageSwaggerSchema } from "../resquests/UploadImage";

export const imagePath: PathItemObject = {
  get: {
    description: "Pega os dados da imagem.",
    tags: ['Image'],
    responses: GetImageSwaggerResponse,
    requestBody: GetImageSwaggerSchema
  },
  post: {
    description: "Cria os dados da página Habilidades.",
    tags: ['Image'],
    responses: UploadImageSwaggerResponse,
    requestBody: UploadImageSwaggerSchema
  },
  delete: {
    description: "Apaga a imagem",
    tags: ['Image'],
    responses: NoContent,
    requestBody: DeleteImageSwaggerSchema
  },
}