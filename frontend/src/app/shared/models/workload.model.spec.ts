import {Workload} from './workload.model';

describe('Workload.Model', () => {
  let model: Workload;

  beforeEach(() => {
    model = new Workload();
  });

  afterEach(() => {
    model = null;
  });

  it('should create an instance', () => {
    expect(new Workload()).toBeTruthy();
  });

  it('should create a Workload Object', () => {
    const input = {id: 1, assignee: 'Hans Muster', sprint: 'dummySprint', storyPoints: 3, project: 'dummyProject'};
    const workload = model.deserialize(input);
    expect(workload).toBeInstanceOf(Workload);
  });

});
