import { v2 } from "cloudinary";
import { describe, expect, test, vi } from "vitest";
import Cloudinary from ".";

describe('cloudinary implementation', () => {
  test('should upload a file and return a url of the file', async () => {
    const imageRepository = new Cloudinary()
    const mockedUrl = {
      secure_url: 'https://cloudinary.com/folder/image.png',
      public_id: "folder/image.png",
    }
    vi.spyOn(v2.uploader, "upload").mockResolvedValue({
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

    expect(result).toEqual({ url: mockedUrl.secure_url, public_id: mockedUrl.public_id })
  })
})
