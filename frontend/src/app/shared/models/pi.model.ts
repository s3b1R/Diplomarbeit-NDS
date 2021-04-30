import {Deserializable} from './deserializable.model';

export class Pi implements Deserializable {

  public id: number;
  public piShortname: number;
  public piStart: string;
  public piEnd: string;
  public sprintCounts: number;
  public sprint1Start: string;
  public sprint1End: string;
  public sprint2Start: string;
  public sprint2End: string;
  public sprint3Start: string;
  public sprint3End: string;
  public sprint4Start: string;
  public sprint4End: string;
  public sprint5Start: string;
  public sprint5End: string;
  public sprint6Start: string;
  public sprint6End: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
