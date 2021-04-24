import { Capacity } from './capacity.model';

describe('Capacity.Model', () => {
  let model: Capacity;

  beforeEach(() => {
    model = new Capacity();
  });

  afterEach(() => {
    model = null;
  });

  it('should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('should create a Capacity Object', () => {
    const input = {id: 1, capa: 0.8, date: '2021-04-19', user: {id: 1, name: 'Hans Muster'}};
    const capacity = model.deserialize(input);
    expect(capacity).toBeInstanceOf(Capacity);
  });
});
