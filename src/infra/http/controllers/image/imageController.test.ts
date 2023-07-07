import { StorageRepository } from "@/infra/storage";
import { v2 } from "cloudinary";
import { describe, expect, test, vi } from "vitest";
import { deleteImageHandler, getImageHandler, uploadImageHandler } from "./imageController";
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
    const result = await getImageHandler({ parameters: publicIdMock })

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
    const result = await uploadImageHandler({ parameters: "folder/image.png" })

    expect(result).toEqual({
      statusCode: 201, body: { url: mock.secure_url, public_id: mock.public_id }
    })
  });

  test('should delete the image without error', async () => {
    const publicId = 'folder/image.jpg'
    vi.spyOn(repository, 'deleteImage').mockResolvedValue({ result: "ok" })
    await deleteImageHandler({ parameters: publicId })

    // expect(spy).toHaveBeenCalledTimes(1)
    await expect(deleteImageHandler({ parameters: publicId })).resolves.not.toThrowError()
  })
});
