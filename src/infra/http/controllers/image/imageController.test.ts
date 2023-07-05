import { describe, expect, test, vi } from "vitest";
import { getImageHandler } from "./imageController";
import { env } from "@/utils/env";
import { StorageRepository } from "@/infra/storage";

describe("Image Controller test", () => {
  const repository = new StorageRepository()

  test("should get image url", async () => {
    const publicIdMock = 'folder/image.jpg'
    const urlMock = `${env.CLOUDINARY_URL}${publicIdMock}`
    const expected = {
      body: {
        url: urlMock,
        statusCode: 200
      }
    }
    vi.spyOn(repository, 'getImage').mockResolvedValue(urlMock)
    const result = await getImageHandler({ parameters: publicIdMock })

    // expect(result).toEqual(expected)
  });

  // test("Create skills page data without error", async () => {
  //   await expect(createSkillsPageHandler({ parameters: skillPageMock }))
  //     .resolves.not.toThrow()
  //   const page = await skillsPageRepository.getSkillsPage()

  //   expect(page).toEqual(skillPageMock)
  // });

  // test("Update skills page data with 204 status code", async () => {
  //   await skillsPageRepository.createSkillsPage(skillPageMock);
  //   const newData = {
  //     title: 'new title',
  //     description: 'new Description'
  //   }
  //   const result = await updateSkillsPageHandler({ parameters: newData })
  //   const page = await skillsPageRepository.getSkillsPage()

  //   expect(result?.statusCode).toEqual(204)
  //   expect(page).toEqual({ ...skillPageMock, ...newData })
  // });

  // test("Delete skills page data with 204 status code", async () => {
  //   await skillsPageRepository.createSkillsPage(skillPageMock);
  //   const result = await deleteSkillsPageHandler()
  //   const page = await skillsPageRepository.getSkillsPage()

  //   expect(result?.statusCode).toEqual(204)
  //   expect(page).toBeUndefined()
  // });
});
