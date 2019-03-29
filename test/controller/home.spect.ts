import { expect } from 'chai';
import { HomeController } from '../../controller/home';

describe('HomeController', () => {
  it('should give back `You are using the persons API`', () => {
    let service = new HomeController();

    expect(service.get()).to.equal('You are using the persons API');
  });
});