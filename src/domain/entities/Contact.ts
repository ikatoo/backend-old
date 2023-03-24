type Localization = {
  latitude: number
  longitude: number
}

export default class Contact {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly localization?: Localization,
  ) { }
}