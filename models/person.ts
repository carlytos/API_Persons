import { injectable } from 'inversify';

interface IPerson {
  name: string;
  surname: string;
  email: string;
  age: number;
  idCollective: string[];
  _id?: string;
}

@injectable()
export class Person implements IPerson {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public age: number,
    public idCollective: string[],
    public _id?: string
  ) { }
}
