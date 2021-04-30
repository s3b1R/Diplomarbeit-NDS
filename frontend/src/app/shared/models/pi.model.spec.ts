import {Pi} from './pi.model';

describe('Pi.Model', () => {
  let model: Pi;

  beforeEach(() => {
    model = new Pi();
  });

  afterEach(() => {
    model = null;
  });

  it('should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('should create a Pi Object', () => {
    const input = {
      id: 1,
      piShortname: '2106',
      piStart: '2021-04-01',
      piEnd: '2021-06-09',
      sprintCounts: 5,
      sprint1Start: null,
      sprint1End: null,
      sprint2Start: null,
      sprint2End: null,
      sprint3Start: null,
      sprint3End: null,
      sprint4Start: null,
      sprint4End: null,
      sprint5Start: null,
      sprint5End: null,
      sprint6Start: null,
      sprint6End: null
    };
    const pi = model.deserialize(input);
    expect(pi).toBeInstanceOf(Pi);
  });

});
