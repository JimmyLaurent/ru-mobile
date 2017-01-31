import 'isomorphic-fetch';
import 'framework7/dist/css/framework7.material.css';
import 'framework7/dist/css/framework7.material.colors.css';
import '../styles/styles.less';

import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  await aurelia.start();
  aurelia.setRoot('app');
}
