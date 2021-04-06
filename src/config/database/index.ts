import dotenv from "dotenv";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

dotenv.config();

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? process.env.POSTGRES_DATABASE_TEST
          : defaultOptions.database,
    })
  );
};
