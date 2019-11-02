import express from "express";
import bodyParser from "body-parser";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import db from "./models";
import apiTravel from "./api/travel";
import apiPerson from "./api/person";
import apiLocation from "./api/location";

const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
app.use(bodyParser.json());

apiTravel(app, db);
apiPerson(app, db);
apiLocation(app, db);
db.sequelize.sync().then(() => {
  db.location.bulkCreate(
    [
      { name: 'Melbourne Airport', nominatimId: 146327231, latitude: -37.667111, longitude: 144.833480766796, type: 'Airport' },
      { name: 'Royal Yacht Club Of Victoria', nominatimId: 17535999, latitude: -37.8606788, longitude: 144.9072672, type: 'Marina' },
      { name: 'Royal Yacht Club Of Tasmania', nominatimId: 170109287, latitude: -42.89777645, longitude: 147.332481183092, type: 'Marina' },
      { name: 'Sydney Airport', nominatimId: 125329460, latitude: -33.9498935, longitude: 151.18196819346, type: 'Airport' },
      { name: 'Vught', nominatimId: 51682493, latitude: 51.6555908, longitude: 5.2921212, type: 'Train Station' },
      { name: 'Verkadefabriek', nominatimId: 138795946, latitude: 51.6957923, longitude: 5.29779645210143, type: 'Venue' },
      { name: '\'s-Hertogenbosch', nominatimId: 51855309, latitude: 51.6957923, longitude: 5.29779645210143, type: 'Train Station' }
    ]
  );
  db.person.bulkCreate(
    [
      { name: 'Alvaro' },
      { name: 'Milo' }
    ]
  );

  db.travel.bulkCreate(
    [
      { oneway: true, departedAt: "2019-01-12", arrivedAt: "2019-01-22", transport: 'Boat', personId: 1, departureLocation: 3, arrivalLocation: 2 },
      { oneway: false, departedAt: "2019-01-02", arrivedAt: "2019-01-04", transport: 'Plane', personId: 1, departureLocation: 1, arrivalLocation: 4 },
      { oneway: false, departedAt: "2019-10-31", arrivedAt: "2019-10-31", transport: 'Train', personId: 2, departureLocation: 5, arrivalLocation: 7 },
      { oneway: false, departedAt: "2019-10-31", arrivedAt: "2019-10-31", transport: 'Foot', personId: 2, departureLocation: 7, arrivalLocation: 6 }
    ]
  );
  /**
   * Swagger
   */
  const definition = {
    info: {
      title: 'Footprint API',
      version: '1.0.0',
      description: 'API for calculating your Carbon footprint',
    },
    basePath: '/',
  };
  const options = {
    definition,
    apis: ['./api/*.js']
  }
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(8080, () => console.log("Api listening on port 8080"));
});