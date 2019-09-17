/* tslint:disable */
export class AdSchedule {
  id?: string;
  startDate?: string;
  endDate?: string;
  name?: string;
  ads?: Array<string>;
  devices?: Array<string>;
  createdDate?: string;

  constructor() {
    this.ads     = [];
    this.devices = [];
  }
}
