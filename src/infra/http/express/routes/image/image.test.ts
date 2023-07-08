import { describe, expect, test, vi } from "vitest";

import { StorageRepository } from "@/infra/storage";
import { env } from "@/utils/env";
import { v2 } from "cloudinary";
import request from "supertest";
import { app } from "../../server";


describe("EXPRESS: /image routes", () => {

  const repository = new StorageRepository()

  test("PUT Method: responds with 405 code when try use put method", async () => {
    const { statusCode } = await request(app)
      .put("/image")
      .send()

    expect(statusCode).toEqual(405);
  })

  test("GET Method: result is equal the mock with 200 statusCode", async () => {
    const mockedUrl = 'https://url.com/image.jpg'
    vi.spyOn(v2, 'url').mockResolvedValue(mockedUrl)

    const { body, statusCode } = await request(app)
      .get("/image")
      .send({
        publicId: 'image.jpg'
      })

    expect(body).toEqual({ url: mockedUrl });
    expect(statusCode).toBe(200);
  });

  test("POST Method: receive file using multipart data and result 201 statusCode with url", async () => {
    const mock = {
      secure_url: 'https://cloudinary.com/folder/image.png',
      public_id: "folder/image.png",
    }
    const uploadSpy = vi.spyOn(v2.uploader, "upload").mockResolvedValue({
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

    const { body, statusCode } = await request(app)
      .post("/image")
      .set("Content-Type", "multipart/form-data")
      .attach('file', 'shared/fixtures/test-image.jpg')
    expect(body).toEqual({ url: mock.secure_url, publicId: mock.public_id });
    expect(uploadSpy).toHaveBeenCalledTimes(1)
    expect(statusCode).toBe(201);
  });

  test('should delete the image using publicId', async () => {
    const publicId = 'folder/image.png'

    const spyDestroyFn = vi.spyOn(v2.uploader, 'destroy').mockResolvedValue({ result: 'ok' })

    const { statusCode } = await request(app)
      .delete("/image")
      .send({ publicId })

    expect(statusCode).toEqual(204)
    expect(spyDestroyFn).toHaveBeenCalledTimes(1)
    expect(spyDestroyFn).toHaveBeenCalledWith(publicId, {
      folder: env.CLOUDNARY_FOLDER,
      overwrite: true,
      unique_filename: false,
      use_filename: true,
    })
  })

});
