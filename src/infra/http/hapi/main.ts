import { initDB } from "@/infra/db";
import { start } from "./server";

initDB();

start();
