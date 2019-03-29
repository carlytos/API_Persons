import { inject, injectable } from 'inversify';
import { CollectiveRepository } from '../utils/repository/collective';
import { Collective } from '../models/collective';
import TYPES from '../constant/types';

@injectable()
export class CollectiveService {
  private collectiveRepository: CollectiveRepository;

  constructor(
    @inject(TYPES.CollectiveRepository) collectiveRepository: CollectiveRepository
  ) {
    this.collectiveRepository = collectiveRepository;
  }

  public getCollectives(): Promise<Collective[]> {
    return new Promise<Collective[]>((resolve, reject) => {
      this.collectiveRepository.find('collectives', {}, (error, data: Collective[]) => {
        resolve(data);
      });
    });
  }

  public getCollective(id: string): Promise<Collective> {
    return new Promise<Collective>((resolve, reject) => {
      this.collectiveRepository.findOneById('collectives', id, (error, data: Collective) => {
        resolve(data);
      });
    });
  }

  public newCollective(collective: Collective): Promise<Collective> {
    return new Promise<Collective>((resolve, reject) => {
      this.collectiveRepository.insert('collectives', collective, (error, data: Collective) => {
        resolve(data);
      });
    });
  }

  public updateCollective(id: string, collective: Collective): Promise<Collective> {
    return new Promise<Collective>((resolve, reject) => {
      this.collectiveRepository.update('collectives', id, collective, (error, data: Collective) => {
        resolve(data);
      });
    });
  }

  public deleteCollective(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.collectiveRepository.remove('collectives', id, (error, data: any) => {
        resolve(data);
      });
    });
  }
}
