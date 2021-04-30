import {Deserializable} from './deserializable.model';
import {User} from './user.model';

export class Capacity implements Deserializable {
  public id: number;
  public capa: number;
  public date: string;
  public user: User;


  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
