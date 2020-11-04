import '../bootstrap';
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { createServer } from '../createServer';
import { initStubDbContainer } from './stubs/initStubDbContainer';

let testServer: ApolloServerTestClient;
let authorId = 0;
let bookId = 0;

beforeAll(async() => {
  await initStubDbContainer();
  const server = await createServer();
  testServer = createTestClient(server);
});

test('it should run mutaion addAuthor and create author', async () => {
  const res = await testServer
    .mutate({
      mutation: `
        mutation AddAuthor {
          addAuthor(newAuthorData: {
            name: "Kurt Vonnegut"
          }) {
            authorId
            name
          }
        }
      `,
    });

  expect(res.data).not.toBe(undefined);
  expect(res.data!.addAuthor).toHaveProperty('authorId');
  expect(res.data!.addAuthor).toHaveProperty('name');
  authorId = res.data!.addAuthor.authorId;
});

test('it should run mutaion addBook and create book', async () => {
  const res = await testServer
    .mutate({
      mutation: `
        mutation AddBook{
          addBook(newBookData: {
            name: "Slaughterhouse-Five"
            pageCount: 256
            authorId: ${authorId}
          }) {
            bookId
            name
            pageCount
            authorId
          }
        }
      `,
    });

  expect(res.data).not.toBe(undefined);
  expect(res.data!.addBook).toHaveProperty('bookId');
  expect(res.data!.addBook).toHaveProperty('name');
  expect(res.data!.addBook).toHaveProperty('pageCount');
  expect(res.data!.addBook).toHaveProperty('authorId');
  bookId = res.data!.addBook.bookId;
});

test('it should query book with author field', async () => {
  const res = await testServer
    .query({
      query: `
        {
          book (id: ${bookId}) {
            bookId
            name
            pageCount
            authorId
            author {
              authorId
              name
            }
          }
        }
      `
    });
  expect(res.data).not.toBe(undefined);
  expect(res.data!.book.author).not.toBe(undefined);
  expect(res.data!.book.author.authorId).toEqual(authorId);
});

test('it should query book without author field', async () => {
  const res = await testServer
    .query({
      query: `
        {
          book (id: ${bookId}) {
            bookId
            name
            pageCount
            authorId
          }
        }
      `
    });
  expect(res.data).not.toBe(undefined);
  expect(res.data!.book.author).toBe(undefined);
});
