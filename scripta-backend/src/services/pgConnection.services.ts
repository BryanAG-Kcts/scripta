
import pgPromise, { IDatabase, IMain } from "pg-promise";
import { ENVIRONMENT } from "../config/environment"

export class PgConnection {
  private static instance: PgConnection;
  public connection: IDatabase<unknown>;

  private constructor() {
    const pgp: IMain = pgPromise({});

    this.connection = pgp(ENVIRONMENT.db_url);
    this.connection
      .connect()
      .then((obj) => {
        console.log("Me conecté " + obj.client.serverVersion);
        obj.done();
      })
      .catch((error: Error) => {
        console.log("ERROR: " + (error.message || error));
      });
  }

  public static getInstance(): PgConnection {
    if (!PgConnection.instance) {
      PgConnection.instance = new PgConnection();
    }
    return PgConnection.instance;
  }
}
