export type Image = {
  url: string
  public_id: string
}

export default interface IImage {
  uploadImage(imagePath: string): Promise<Image>;
  getImage(publicId: string): Promise<string | undefined>;
  deleteImage(publicId: string): Promise<{
    result: "ok" | unknown
  }>;
}
