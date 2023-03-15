import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string) => {
  if (process.env[key] === undefined) {
    console.error(`*** ${key} IS UNDEFINED. ***`);
    process.exit(1)
  }
  
  return `${process.env[key] ?? ""}`;
};

export const env = {
  PORT: +(getEnv("PORT")),
  HOST: (getEnv("HOST")),
};
