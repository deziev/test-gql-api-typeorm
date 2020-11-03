import './bootstrap';
import { initContainer } from 'components/di';

import Container from 'typedi';
import { Type } from 'components/container/Type';
import { AuthorRepository } from 'inf/AuthorRepository';

initContainer().then(async() => {
  const repository = Container.get<AuthorRepository>(Type.AuthorRepository);
  const data = await repository.find();
  console.log(data);
});