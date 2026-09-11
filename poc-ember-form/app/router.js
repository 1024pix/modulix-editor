import EmberRouter from '@embroider/router';
import config from 'modulix-form-poc-scaffold-pristine/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
