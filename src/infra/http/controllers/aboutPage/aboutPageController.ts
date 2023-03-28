import { AboutPageRepository } from "@/infra/db";

const aboutPageRepository = new AboutPageRepository();

async function getAboutPageHandler() {
  const aboutPage = await aboutPageRepository.getAboutPage()

  return aboutPage
}

export { getAboutPageHandler };
