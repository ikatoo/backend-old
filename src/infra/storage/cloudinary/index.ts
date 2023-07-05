import { env } from "@/utils/env";
import {
  UploadApiOptions,
  v2 as cloudinary
} from "cloudinary";

import IImage, { Image } from "@/repository/IImage";

export default class CloudinaryRepository implements IImage {

  private readonly options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: env.CLOUDNARY_FOLDER
  };

  constructor() {
    cloudinary.config({
      secure: true,
    });
  }


  async uploadImage(imagePath: string): Promise<Image> {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(imagePath, this.options);
    return { url, public_id }
  }

  getImage(publicId: string): Promise<string | undefined> {
    const url = Promise.resolve(cloudinary.url(publicId, this.options))

    return url;
  }

  async deleteImage(publicId: string): Promise<{ result: "ok" | unknown }> {
    const result = Promise.resolve(cloudinary.uploader.destroy(publicId, this.options))
    return result
  }
}