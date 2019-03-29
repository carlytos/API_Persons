import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { Collective } from '../models/collective';
import { CollectiveService } from '../service/collective';
import TYPES from '../constant/types';
  
  @controller('/collectives')
  export class CollectiveController {
  
    constructor( @inject(TYPES.CollectiveService) private collectiveService: CollectiveService) { }
  
    @httpGet('/')
    public getCollectives(): Promise<Collective[]> {
      return this.collectiveService.getCollectives();
    }
  
    @httpGet('/:id')
    public getCollective(request: Request): Promise<Collective> {
      return this.collectiveService.getCollective(request.params.id);
    }
  
    @httpPost('/')
    public newCollective(request: Request): Promise<Collective> {
      return this.collectiveService.newCollective(request.body);
    }
  
    @httpPut('/:id')
    public updateCollective(request: Request): Promise<Collective> {
      return this.collectiveService.updateCollective(request.params.id, request.body);
    }
  
    @httpDelete('/:id')
    public deleteCollective(request: Request): Promise<any> {
      return this.collectiveService.deleteCollective(request.params.id);
    }
  }