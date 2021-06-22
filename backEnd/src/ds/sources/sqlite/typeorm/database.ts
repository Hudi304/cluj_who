import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm';

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(name: string): Promise<Connection> {
    const CONNECTION_NAME: string = name;
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME);
    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {

      const connectionOptions: ConnectionOptions = {
      name:CONNECTION_NAME,
        type: "sqlite",
      database: "database.sqlite",
      synchronize: true,
      logging: false,
      entities: [
         "compiled/ds/entity/**/*.js"
      ],
      migrations: [
         "compiled/ds/migration/**/*.js"
      ],
      subscribers: [
         "compiled/ds/subscriber/**/*.js"
      ],
      cli: {
         "entitiesDir": "compiled/ds/entity",
         "migrationsDir": "compiled/ds/migration",
         "subscribersDir": "compiled/ds/subscriber"
      }
      };
      connection = await createConnection(connectionOptions);
    }
    return connection;
  }
}
