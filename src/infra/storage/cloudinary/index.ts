import { env } from "@/utils/env";
import {
  UploadApiOptions,
  v2 as cloudinary
} from "cloudinary";

import IImage, { Image } from "@/repository/IImage";

// cloudinary.config({
//   secure: true,
// });

// const getAssetInfo = async (publicId: string) => {
//   const options = {
//     colors: true,
//   };

//   const result = await cloudinary.api.resource(publicId, options);
//   return result
// };

// const getUrl = (
//   publicId: string,
//   options?: TransformationOptions | ConfigAndUrlOptions
// ) => {
//   const url = cloudinary.url(publicId, options);

//   return url;
// };

// const uploadImage = async (imagePath: string) => {
//   const options: UploadApiOptions = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//     folder: env.CLOUDNARY_FOLDER
//   };

//   const { url, public_id } = await cloudinary.uploader.upload(imagePath, options);
//   return { url, public_id }
// };

// export { uploadImage, getUrl, getAssetInfo }

export default class Cloudinary implements IImage {

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