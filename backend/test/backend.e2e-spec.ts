import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src//users/users.module';
import { Repository } from 'typeorm';
import { Users } from './../src/users/users.entity';
import { Capacity } from '../src/capacity/capacity.entity';
import { CapacityModule } from '../src/capacity/capacity.module';

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
    await app.close();
  });
});

describe('CapacityModule (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<Users>;
  let capacityRepository: Repository<Capacity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CapacityModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userRepository = moduleFixture.get('UsersRepository');
    capacityRepository = moduleFixture.get('CapacityRepository');
  });

  it('should create a new capacity', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/capacity/create')
      .set('Accept', 'application/json')
      .send({
        capa: '0.8',
        date: '2021-04-13',
        user: '2',
      })
      .expect(201);

    expect(body).toEqual({
      capa: '0.8',
      date: '2021-04-13',
      user: '2',
      id: 1,
    });
  });

  it('should return an array of users', async () => {
    await request(app.getHttpServer())
      .post('/capacity/create')
      .set('Accept', 'application/json')
      .send({
        capa: '0.8',
        date: '2021-04-14',
        user: '2',
      });
    const { body } = await request(app.getHttpServer())
      .get('/capacity')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      {
        id: 1,
        capa: '0.8',
        date: '2021-04-13',
        user: { id: 2, name: 'Hans Test' },
      },
      {
        id: 2,
        capa: '0.8',
        date: '2021-04-14',
        user: { id: 2, name: 'Hans Test' },
      },
    ]);
    expect(body).toHaveLength(2);
  });


  it('should return a capacity by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/capacity/2')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([{ id: 2, capa: '0.8', date: '2021-04-14' }]);
    expect(body).toHaveLength(1);
  });

  it('should update a capacity', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/capacity/1/update')
      .set('Accept', 'application/json')
      .send({ capa: '1.0' })
      .expect(200);
    expect(body).toHaveProperty('raw.changedRows', 1);
    expect(body).toHaveProperty('affected', 1);
  });

  it('should delete a capacity', async () => {
    const { body } = await request(app.getHttpServer())
      .delete('/capacity/1/delete')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toHaveProperty('raw.changedRows', 0);
    expect(body).toHaveProperty('affected', 1);
  });

  afterAll(async () => {
    await capacityRepository.query(`DROP TABLE capacity;`);
    await userRepository.query(`DROP TABLE users;`);
    await app.close();
  });
});
