import { injectable } from 'inversify';

interface ICollective {
    name: string;
    description: string;
    entity: string;
    members: string[];
    parentCollectiveId: string;
    collectives: string[];
    _id?: string;
}

@injectable()
export class Collective implements ICollective {
  constructor(
   public name: string,
   public description: string,
   public entity: string,
   public members: string[],
   public parentCollectiveId: string,
   public collectives: string[],
   public _id?: string
  ) { }
}

