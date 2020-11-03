import { initDbContainer } from './container/db';

export const initContainer = async () => {
  await initDbContainer();
}