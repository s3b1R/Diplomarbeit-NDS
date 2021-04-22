import { User } from './user.model';

describe('User.Model', () => {
  let model: User;

  beforeEach(() => {
    model = new User();
  });

  afterEach(() => {
    model = null;
  });

  it('should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('should create a User Object', () => {
    const input = {id: 1, name: 'Hans Muster'};
    const user = model.deserialize(input);
    expect(user).toBeInstanceOf(User);
  });

});
