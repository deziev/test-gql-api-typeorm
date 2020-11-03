import { createConnection, Connection, ConnectionOptions } from 'typeorm';

class DbConnectionFactory {
  public static async create(config: ConnectionOptions): Promise<Connection> {
    return createConnection(config);
  }

}

export { DbConnectionFactory };
