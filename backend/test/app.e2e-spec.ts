import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src//users/users.module';
import { Connection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200);

      // expect(body).toEqual([
      //   { id: expect.any(Number), name: 'Hans Muster' },
      //   { id: expect.any(Number), name: 'Sebastian Rüegg' },
      //   { id: expect.any(Number), name: 'Peter Lustig' },
      //   { id: expect.any(Number), name: 'Peter Müller' },
      //   { id: expect.any(Number), name: 'Gundula Gause' },
      // ]);

      expect(body).toHaveLength(0);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
