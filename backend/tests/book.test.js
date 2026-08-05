const request = require('supertest');
const app = require('../src/server');

describe('Book API', () => {
  test('GET /api/books should return all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /api/books should create a book', async () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Fiction',
    };
    const response = await request(app).post('/api/books').send(book);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.title).toBe(book.title);
  });
});
