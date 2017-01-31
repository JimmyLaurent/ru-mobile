import _ from 'lodash';
import {HttpClient} from 'aurelia-http-client';

export class ProxyService {

  yahooQueryUrl = "https://query.yahooapis.com/v1/public/yql?q="

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getData(query) {
    return this.httpClient.get(this.yahooQueryUrl + query).then((httpResponse) => {
          console.log(httpResponse);
          let response = httpResponse.response;
          let result = response.substring(response.indexOf('<results>'), response.indexOf('</results>'));
          return result;
        });
  }
}
