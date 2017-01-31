import _ from 'lodash';
import { inject } from 'aurelia-framework';
import { ProxyService } from './proxy-service';
import { HttpClient } from 'aurelia-http-client';

@inject(ProxyService)
export class TorrentSearchService {

  constructor(proxyService) {
    this.proxyService = proxyService;
    this.httpClient = new HttpClient().configure(x => {
      x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
    });
  }

  async getDetail(torrent) {
    if (_.startsWith(torrent.desc, 'https://www.t411')) {
      let query = `select * from html where url="${torrent.desc}" and xpath="//article"`;
      return await this.proxyService.getData(query);
    }
    return null;
  }

  getProviders() {
    let sites = _.map(theSearchEngines.sites, (value, name) => {
      value.name = name;
      return value;
    });

    let publicSites = _.filter(sites, s => s.enabled);
    publicSites.splice(0, 0, { value: 'all', name: 'all', cats: ['all'] });

    return publicSites;
  }

  async search(siteName, categoryName, queryText) {
    let postDatas = `mode=get&eng=${encodeURIComponent(siteName)}&what=${encodeURIComponent(queryText)}&cat=${encodeURIComponent(categoryName)}`;
    return this.httpClient.post('plugins/extsearch/action.php', postDatas).then((httpResponse) => {

      let results = JSON.parse(httpResponse.response);
      let torrentsSorted = _.orderBy(results.data, ['seeds', 'peers'], ['desc', 'desc']);

      return _.map(torrentsSorted, t => {
        t.timeHumanized = theConverter.date(t.time);
        t.sizeHumanized = theConverter.bytes(t.size, 2);
        return t;
      });
    });
  }
}
