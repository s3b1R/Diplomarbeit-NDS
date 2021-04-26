import { Deserializable } from './deserializable.model';

export class Workload implements Deserializable{
  public id: number;
  assignee: string;
  sprint: string;
  storyPoints: number;
  project: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
