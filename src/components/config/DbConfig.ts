import { resolve } from 'path';
import { configLoader } from './configLoader';

type TDbConfig = {
  type: 'postgres';
  host?: string;
  port?: number;
  logging: boolean | 'all' | ('warn' | 'query' | 'schema' | 'error' | 'info' | 'log' | 'migration')[] | undefined;
  database: string;
  username?: string;
  password?: string;
  cli?: { migrationsDir: string; };
  migrations?: string[];
  entities?: string[];
};

export const DbConfig: TDbConfig = {
  type: 'postgres',
  logging: 'all',
  host: 'localhost',
  database: 'bellintegrator_test_db',
  username: 'user_user',
  password: '123qwe',
  cli: {
    migrationsDir: 'src/inf/migrations'
  },
  entities: [resolve(__dirname, '../../domain/**/*.js')],
  migrations: [resolve(__dirname, '../../inf/migrations/*.js')],
  ...configLoader.getConfig<Object>('db'),
};