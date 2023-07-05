import { z } from "zod"

export const ImageSchema = z.object({
  url: z.string().url("Invalid url"),
  public_id: z.string(),
})

export const PartialImageSchema = ImageSchema.partial()

export type Image = z.infer<typeof ImageSchema>

export default interface IImage {
  uploadImage(imagePath: string): Promise<Image>;
  getImage(publicId: string): Promise<Image | undefined>;
  deleteImage(publicId: string): Promise<void>;
  clear(): Promise<void>
}
