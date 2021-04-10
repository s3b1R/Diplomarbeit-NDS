import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src//users/users.module';
import { CapacityModule } from './../src/capacity/capacity.module';
import { PiModule } from './../src/pi/pi.module';
import { Workload } from './../src/workload/workload.entity';
import { WorkloadModule } from './../src/workload/workload.module';

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

describe('UsersModule (e2e)', () => {
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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CapacityModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
        date: '2021-05-14',
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
        date: '2021-05-14',
        user: { id: 2, name: 'Hans Test' },
      },
    ]);
    expect(body).toHaveLength(2);
  });

  it('should return capacities by month', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/capacity/month/2021-04')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      {
        id: 1,
        capa: '0.8',
        date: '2021-04-13',
        user: { id: 2, name: 'Hans Test' },
      },
    ]);
    expect(body).toHaveLength(1);
  });

  it('should return a capacity by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/capacity/2')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([{ id: 2, capa: '0.8', date: '2021-05-14' }]);
    expect(body).toHaveLength(1);
  });

  it('should return a capacity by date and user id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/capacity/2021-04-13/2')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      {
        id: 1,
        capa: '0.8',
        date: '2021-04-13',
        user: { id: 2, name: 'Hans Test' },
      },
    ]);
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
    await app.close();
  });
});

describe('PiModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new pi', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/pi/create')
      .set('Accept', 'application/json')
      .send({
        piShortname: '2103',
        piStart: '2021-01-06',
        piEnd: '2021-03-01',
        sprintCounts: '5',
      })
      .expect(201);

    expect(body).toEqual({
      piShortname: '2103',
      piStart: '2021-01-06',
      piEnd: '2021-03-01',
      sprintCounts: '5',
      id: 1,
    });
  });

  it('should return an array of pi', async () => {
    await request(app.getHttpServer())
      .post('/pi/create')
      .set('Accept', 'application/json')
      .send({
        piShortname: '2105',
        piStart: '2021-05-06',
        piEnd: '2021-07-01',
        sprintCounts: '5',
      });
    const { body } = await request(app.getHttpServer())
      .get('/pi')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      {
        id: 2,
        piShortname: 2105,
        piStart: '2021-05-06',
        piEnd: '2021-07-01',
        sprintCounts: 5,
      },
      {
        id: 1,
        piShortname: 2103,
        piStart: '2021-01-06',
        piEnd: '2021-03-01',
        sprintCounts: 5,
      },
    ]);
    expect(body).toHaveLength(2);
  });

  it('should return a pi by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/pi/2')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      {
        id: 2,
        piShortname: 2105,
        piStart: '2021-05-06',
        piEnd: '2021-07-01',
        sprintCounts: 5,
      },
    ]);
    expect(body).toHaveLength(1);
  });

  it('should update a pi', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/pi/1/update')
      .set('Accept', 'application/json')
      .send({ sprintCounts: '6' })
      .expect(200);
    expect(body).toHaveProperty('raw.changedRows', 1);
    expect(body).toHaveProperty('affected', 1);
  });

  it('should delete a pi', async () => {
    const { body } = await request(app.getHttpServer())
      .delete('/pi/1/delete')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toHaveProperty('raw.changedRows', 0);
    expect(body).toHaveProperty('affected', 1);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('WorkloadModule (e2e)', () => {
  let app: INestApplication;
  let workloadRepository: Repository<Workload>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, WorkloadModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    workloadRepository = moduleFixture.get('WorkloadRepository');
  });

  it('should create a new workload', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/workload/create')
      .set('Accept', 'application/json')
      .send({
        assignee: 'Hans Muster',
        sprint: 'E2E 2101-5 (23.12.-5.1.)',
        storyPoints: '1.0',
        project: 'Go4 E2E',
      })
      .expect(201);

    expect(body).toEqual({
      assignee: 'Hans Muster',
      sprint: 'E2E 2101-5 (23.12.-5.1.)',
      storyPoints: '1.0',
      project: 'Go4 E2E',
      id: 1,
    });
  });

  it('should return an array of workloads', async () => {
    await request(app.getHttpServer())
      .post('/workload/create')
      .set('Accept', 'application/json')
      .send({
        assignee: 'Hanna Muster',
        sprint: 'E2E 2101-5 (23.12.-5.1.)',
        storyPoints: '0.8',
        project: 'Go4 E2E',
      });
    const { body } = await request(app.getHttpServer())
      .get('/workload')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual([
      {
        id: 1,
        assignee: 'Hans Muster',
        sprint: 'E2E 2101-5 (23.12.-5.1.)',
        storyPoints: '1.0',
        project: 'Go4 E2E',
      },
      {
        id: 2,
        assignee: 'Hanna Muster',
        sprint: 'E2E 2101-5 (23.12.-5.1.)',
        storyPoints: '0.8',
        project: 'Go4 E2E',
      },
    ]);
    expect(body).toHaveLength(2);
  });

  it('should clear workload table', async () => {
    const { body } = await request(app.getHttpServer())
      .delete('/workload/delete')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toEqual({});
  });

  afterAll(async () => {
    await workloadRepository.query(`DROP TABLE capacity;`);
    await workloadRepository.query(`DROP TABLE users;`);
    await workloadRepository.query(`DROP TABLE pi;`);
    await workloadRepository.query(`DROP TABLE workload;`);
    await app.close();
  });
});
