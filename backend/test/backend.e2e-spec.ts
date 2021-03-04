import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src//users/users.module';
import { Repository } from 'typeorm';
import { Users } from './../src/users/users.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('is reachable', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Usersmodule (e2e)', () => {
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

  it('should create a new user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users/create')
      .set('Accept', 'application/json')
      .send({ name: 'Susi Test' })
      .expect(201);

    expect(body).toEqual({ name: 'Susi Test', id: 1 });
  });

  it('should return an array of users', async () => {
    await request(app.getHttpServer())
      .post('/users/create')
      .set('Accept', 'application/json')
      .send({ name: 'Hans Test' });
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      { id: expect.any(Number), name: 'Susi Test' },
      { id: expect.any(Number), name: 'Hans Test' },
    ]);
    expect(body).toHaveLength(2);
  });

  it('should return an user by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users/2')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([{ id: expect.any(Number), name: 'Hans Test' }]);
    expect(body).toHaveLength(1);
  });

  it('should update an users name', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/users/1/update')
      .set('Accept', 'application/json')
      .send({ name: 'Hanna Test' })
      .expect(200);
    expect(body).toHaveProperty('raw.changedRows', 1);
    expect(body).toHaveProperty('affected', 1);
  });

  it('should delete an user', async () => {
    const { body } = await request(app.getHttpServer())
      .delete('/users/1/delete')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toHaveProperty('raw.changedRows', 0);
    expect(body).toHaveProperty('affected', 1);
  });

  afterAll(async () => {
    await repository.query(`DROP TABLE users;`);
    await app.close();
  });
});
