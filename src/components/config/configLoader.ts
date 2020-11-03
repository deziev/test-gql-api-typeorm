import { resolve } from 'path';

class ConfigLoader {
  private baseConfig: { [key: string]: Object; };

  constructor(configDirPath: string) {
    this.baseConfig = require(resolve(configDirPath, 'base'));
    let localConfig: { [key: string]: Object; } | undefined = undefined;

    if (process.env.PROJECT_ENV === 'DEV') {
      try {
        localConfig = require(resolve(configDirPath, 'local'));
      } catch (error) {
        console.error('Local config not found!');
      }
    }
    // Merging config schemes
    if (localConfig) {
      Object.keys(this.baseConfig).forEach(key => {
        if (localConfig![key]) {
          this.baseConfig[key] = { ...this.baseConfig[key], ...localConfig![key] };
        }
      });
    }
  }

  public getConfig<Config>(name: string): Config {
    if (!this.baseConfig[name]) {
      throw new Error('Config not found!')
    }
    return this.baseConfig[name] as Config;
  }
}

const configLoader = new ConfigLoader(resolve(__dirname, '../../../config'));

export { ConfigLoader, configLoader };
