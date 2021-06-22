import sqlite3 from "sqlite3"
import { DATABASE_NAME } from "../../../../../constants"

export class SqliteConnection {
  private static db?

  static getConnectionToSqlit() {
    if (SqliteConnection.db)
      return SqliteConnection.db
    else return SqliteConnection.db = new sqlite3.Database(DATABASE_NAME)
  }

}