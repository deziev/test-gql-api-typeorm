import { configLoader } from './configLoader';

type TServerConfig = {
  host: string;
  port: number;
}

export const ServerConfig: TServerConfig = {
  ...configLoader.getConfig<any>('server'),
};