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
  PORT: +getEnv("PORT"),
  HOST: (getEnv("HOST")),
  POSTGRES_PASSWORD: getEnv("POSTGRES_PASSWORD"),
  POSTGRES_USER: getEnv("POSTGRES_USER"),
  POSTGRES_HOSTNAME: getEnv("POSTGRES_HOSTNAME"),
  POSTGRES_PORT: +getEnv("POSTGRES_PORT"),
  POSTGRES_DBNAME: getEnv("POSTGRES_DBNAME"),
};
