export default class Contact {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly localization_lat?: number,
    readonly localization_lng?: number
  ) { }
}