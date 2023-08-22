export default interface ITokenBlacklist {
  add(code: string): Promise<void>
  remove(code: string): Promise<void>
  isBlacklisted(code: string): Promise<boolean>
}