import { inject, injectable } from 'inversify';
import { PersonRepository } from '../utils/repository/person';
import { Person } from '../models/person';
import TYPES from '../constant/types';
import { Collective } from '../models/collective';
import { CollectiveRepository } from '../utils/repository/collective';


@injectable()
export class PersonService {
  private collectiveRepository: CollectiveRepository;
  private personRepository: PersonRepository;

  constructor(
    @inject(TYPES.PersonRepository) personRepository: PersonRepository,
    @inject(TYPES.CollectiveRepository) CollectiveRepository: CollectiveRepository
  ) {
    this.personRepository = personRepository;
    this.collectiveRepository = CollectiveRepository;

  }

  public getPersons(): Promise<Person[]> {
    return new Promise<Person[]>((resolve, reject) => {
      this.personRepository.find('persons', {}, (error, data: Person[]) => {
        resolve(data);
      });
    });
  }

  public getPerson(id: string): Promise<Person> {
    return new Promise<Person>((resolve, reject) => {
      this.personRepository.findOneById('persons', id, (error, data: Person) => {
        resolve(data);
      });
    });
  }

  public newPerson(person: Person, collective: Collective): Promise<Person> {
    var createPersonPromise = new Promise<Person>((resolve, reject) => {
      this.personRepository.insert('persons', person, (error, data: Person) => {
         resolve(data);
      });
    });
    
    createPersonPromise.then((data)=>{    
      new Promise<Collective>((resolve, reject) => {
         data.idCollective.forEach((collectiveID,index)=>{
          this.collectiveRepository.updateMember('collectives', collectiveID, data._id, collective, (error, data2: Collective) => {
            resolve(data2);
          });
        });
        
    });});

    return createPersonPromise;
  }

  public updatePerson(id: string, person: Person, collective: Collective): Promise<Person> {
    var updatePersonPromise = new Promise<Person>((resolve, reject) => {
      this.personRepository.update('persons', id, person, (error, data: Person) => {
        resolve(data);
      });
    });
    updatePersonPromise.then((data)=>{    
      new Promise<Collective>((resolve, reject) => {
         person.idCollective.forEach((collectiveID,index)=>{
          this.collectiveRepository.updateMember('collectives', collectiveID, id, collective, (error, data2: Collective) => {
            resolve(data2);
          });
          });
        
    });});

    return updatePersonPromise;
  }

  public deletePerson(id: string,person: Person, collective: Collective): Promise<any> {
    var deletePersonPromise = new Promise<any>((resolve, reject) => {
      this.personRepository.remove('persons', id, (error, data: any) => {
        resolve("Person removed successfully");
      });
    });

    deletePersonPromise.then((data)=>{    
      new Promise<Collective>((resolve, reject) => {
          this.collectiveRepository.deleteMember('collectives', id,collective, (error, data2: Collective) => {
            resolve(data2);
          });
        });
        
    });

    return deletePersonPromise;

  }

}
