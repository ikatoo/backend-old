import { StorageRepository } from "@/infra/storage";
import { v2 } from "cloudinary";
import { describe, expect, test, vi } from "vitest";
import { deleteImageHandler, getImageHandler, uploadImageHandler } from "./imageController";
import { env } from "@/utils/env";
vi.mock('cloudinary')
describe("Image Controller test", () => {
  const repository = new StorageRepository()

  test("should get image url", async () => {
    const publicIdMock = 'folder/image.jpg'
    const urlMock = `https://res.cloudinary.com/mckatoo/image/upload/v1/${publicIdMock}`
    const expected = {
      body: {
        url: urlMock,
      },
      statusCode: 200
    }
    vi.spyOn(v2, 'url').mockResolvedValue(urlMock)
    const result = await getImageHandler({
      parameters: {
        data: { id: publicIdMock }
      }
    })

    expect(result).toEqual(expected)
  });

  test("should upload a image", async () => {
    const mock = {
      secure_url: 'https://cloudinary.com/folder/image.png',
      public_id: "folder/image.png",
    }
    vi.spyOn(v2.uploader, 'upload').mockResolvedValue({
      ...mock,
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
    const result = await uploadImageHandler({
      parameters: {
        data: {
          path: "shared/fixtures/test-image.jpg"
        }
      }
    })

    expect(result).toEqual({
      statusCode: 201, body: { url: mock.secure_url, publicId: mock.public_id }
    })
  });

  test('should delete the image without error', async () => {
    const publicId = 'folder/image.jpg'
    const spyDestroyFn = vi.spyOn(v2.uploader, "destroy").mockResolvedValue({ result: "ok" })
    const result = await deleteImageHandler({ parameters: { data: { id: publicId } } })

    expect(spyDestroyFn).toHaveBeenCalledTimes(1)
    expect(spyDestroyFn).toHaveBeenCalledWith(publicId, {
      folder: env.CLOUDNARY_FOLDER,
      overwrite: true,
      unique_filename: false,
      use_filename: true,
    })
    expect(result).toEqual({ statusCode: 204 })
  })
});
