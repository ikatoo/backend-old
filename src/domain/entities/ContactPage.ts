import Contact from "./Contact";

export default class ContactPage {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly contact: Contact,
  ) { }
}