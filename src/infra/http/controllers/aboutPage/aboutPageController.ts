import { AboutPageRepository } from "@/infra/db";
import { AboutPage } from "@/repository/IAboutPage";

const aboutPageRepository = new AboutPageRepository();

async function getAboutPageHandler() {
  const aboutPage = await aboutPageRepository.getAboutPage()

  return aboutPage
}

async function createAboutPageHandler(page: AboutPage) {
  await aboutPageRepository.createAboutPage(page)
}

async function updateAboutPageHandler(page: Partial<AboutPage>) {
  await aboutPageRepository.updateAboutPage(page)
}

export { getAboutPageHandler, createAboutPageHandler, updateAboutPageHandler };
