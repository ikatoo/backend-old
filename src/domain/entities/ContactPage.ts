import Contact from "./Contact";

export default class ContactPage {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly contact: Contact,
  ) { }
}