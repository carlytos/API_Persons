import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export class HomeController {
  @httpGet('/')
  public get(): string {
    return 'You are using the persons API';
  }
}