import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { Person } from '../models/person';
import { PersonService } from '../service/person';
import TYPES from '../constant/types';
  
  @controller('/persons')
  export class PersonController {
  
    constructor( @inject(TYPES.PersonService) private personService: PersonService) { }
  
    @httpGet('/')
    public getPersons(): Promise<Person[]> {
      return this.personService.getPersons();
    }
  
    @httpGet('/:id')
    public getPerson(request: Request): Promise<Person> {
      return this.personService.getPerson(request.params.id);
    }
  
    @httpPost('/')
    public newPerson(request: Request): Promise<Person> {
      return this.personService.newPerson(request.body, request.body);
    }
  
    @httpPut('/:id')
    public updatePerson(request: Request): Promise<Person> {
      return this.personService.updatePerson(request.params.id, request.body, request.body);
    }
  
    @httpDelete('/:id')
    public deletePerson(request: Request): Promise<any> {
      return this.personService.deletePerson(request.params.id, request.body, request.body);
    }
  }