import { Deserializable } from './deserializable.model';

export class Pi implements Deserializable{

  public piShortname: number;
  public piStart: string;
  public piEnd: string;
  public sprintCounts: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
