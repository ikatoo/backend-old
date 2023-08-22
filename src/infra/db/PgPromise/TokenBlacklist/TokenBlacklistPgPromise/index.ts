import ITokenBlacklist from "@/repository/ITokenBlacklist";
import db from "../..";

export default class TokenBlacklistPgPromise implements ITokenBlacklist {
  async isBlacklisted(code: string): Promise<boolean> {
    const token = await db.oneOrNone('select * from token_blacklist where code=$1', [code])

    return !!token
  }

  async add(code: string): Promise<void> {
    await db.none(
      'insert into token_blacklist (code) values ($1)',
      [code]
    )
  }

  async remove(code: string): Promise<void> {
    await db.none(
      'delete from token_blacklist where code=$1',
      [code]
    )
  }
}