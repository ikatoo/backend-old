import { v2 } from "cloudinary";
import { describe, expect, test, vi } from "vitest";
import CloudinaryRepository from ".";
import { env } from "@/utils/env";

const imageRepository = new CloudinaryRepository()

describe('cloudinary implementation', () => {
  test('should upload a file and return a url of the file', async () => {
    const mockedUrl = {
      secure_url: 'https://cloudinary.com/folder/image.png',
      public_id: "folder/image.png",
    }
    const uploadSpy = vi.spyOn(v2.uploader, "upload").mockResolvedValue({
      ...mockedUrl,
      version: 0,
      signature: "",
      width: 0,
      height: 0,
      format: "",
      resource_type: "image",
      created_at: "",
      tags: [],
      pages: 0,
      bytes: 0,
      type: "",
      etag: "",
      placeholder: false,
      url: "",
      access_mode: "",
      original_filename: "",
      moderation: [],
      access_control: [],
      context: {},
      metadata: {}
    })

    const result = await imageRepository.uploadImage('image/path')

    expect(uploadSpy).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ url: mockedUrl.secure_url, public_id: mockedUrl.public_id })
  })

  test('should get url of the image by public id', async () => {
    const expected = 'https://cloudinary.com/folder/image.png'
    const public_id = "folder/image.png"
    const urlSpy = vi.spyOn(v2, "url").mockResolvedValue(expected)

    const result = await imageRepository.getImage(public_id)

    expect(result).toEqual(expected)
    expect(urlSpy).toHaveBeenCalledTimes(1)
    expect(urlSpy).toHaveBeenCalledWith(public_id, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: env.CLOUDNARY_FOLDER
    })
  })

  test('should delete the image by public id', async () => {
    const expected = { result: "ok" }
    const public_id = "folder/image.png"
    const destroySpy = vi.spyOn(v2.uploader, "destroy").mockResolvedValue(expected)

    const result = await imageRepository.deleteImage(public_id)

    expect(result).toEqual(expected)
    expect(destroySpy).toHaveBeenCalledTimes(1)
    expect(destroySpy).toHaveBeenCalledWith(public_id, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: env.CLOUDNARY_FOLDER
    })
  })
})
