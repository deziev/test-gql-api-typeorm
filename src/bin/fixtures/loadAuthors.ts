import '../../bootstrap';
import { initContainer  } from 'components/di';
import { resolve } from 'path';

import Container from 'typedi';
import { Type } from 'components/container/Type';
import { AuthorRepository } from 'inf/AuthorRepository';

initContainer().then(async() => {
  const fixturePath = resolve(__dirname, '../../../fixtures/authors');
  const repository = Container.get<AuthorRepository>(Type.AuthorRepository);

  const data = require(fixturePath);

  await repository.save(data);
})