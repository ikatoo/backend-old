import pgPromise from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";

declare global {
  var PG_PROMISE_DB: pgPromise.IDatabase<{}, IClient>
} 