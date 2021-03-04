import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src//users/users.module';
import { Repository } from 'typeorm';
import { Users } from './../src/users/users.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Users>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('UsersRepository');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });

  describe('POST /users/create', () => {
    it('should create a new user', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/users/create')
        .set('Accept', 'application/json')
        .send({ name: 'Susi Test' })
        .expect(201);

      expect(body).toEqual({ name: 'Susi Test', id: 1 });
    });
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200);

      expect(body).toEqual([{ id: expect.any(Number), name: 'Susi Test' }]);
      expect(body).toHaveLength(1);
    });
  });

  describe('DELETE /users/1/delete', () => {
    it('should create a new user', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/users/1/delete')
        .set('Accept', 'application/json')
        .expect(200);

      expect(body).toEqual({
        raw: {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          serverStatus: 2,
          warningCount: 0,
          message: '',
          protocol41: true,
          changedRows: 0,
        },
        affected: 1,
      });
    });
  });

  afterAll(async () => {
    await repository.query(`DROP TABLE users;`);
    await app.close();
  });
});
