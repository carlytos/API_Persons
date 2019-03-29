//ts-node-dev server.ts
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import TYPES from './constant/types';
import { PersonService } from './service/person';
import { PersonRepository } from './utils/repository/person';
import './controller/home';
import './controller/person';
import './controller/collective';
import { CollectiveRepository } from './utils/repository/collective';
import { CollectiveService } from './service/collective';


// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}


container.bind<PersonRepository>(TYPES.PersonRepository).to(PersonRepository);
container.bind<PersonService>(TYPES.PersonService).to(PersonService);

container.bind<CollectiveRepository>(TYPES.CollectiveRepository).to(CollectiveRepository);
container.bind<CollectiveService>(TYPES.CollectiveService).to(CollectiveService);



// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

exports = module.exports = app;
