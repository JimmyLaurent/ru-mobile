import { inject } from 'aurelia-framework';
import { RuTorrentService } from '../../services/rutorrent-service';
import _ from 'lodash';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(RuTorrentService, EventAggregator)
export default class Torrent {
  constructor(ruTorrentService, eventAggregator) {
    this.title = 'Torrent list';
    this.ruTorrentService = ruTorrentService;
    this.eventAggregator = eventAggregator;
    this.sortBy = 'addtime';
    this.order = 'desc';

    let sortParams = [
      { 'name': 'Name', 'value': 'name' },
      { 'name': 'Status', 'value': 'status' },
      { 'name': 'Size', 'value': 'size' },
      { 'name': 'Added time', 'value': 'addtime' },
      { 'name': 'Remaining time', 'value': 'remaining' },
      { 'name': 'Percentage done', 'value': 'percent' },
      { 'name': 'Download speed', 'value': 'dl' },
      { 'name': 'Upload speed', 'value': 'ul' }
    ];

    this.eventAggregator.publish('popoper:source:init', sortParams);
    this.eventAggregator.subscribe('popoper:item:click', (item) => this.setSorting(item.value));
    // name, status, size, addtime created, remaining, ratio, percent, dl , ul
  }

  async activate(params, routeConfig, $navigationInstruction) {
    await this.setTorrents(true);

    let self = this;
    this.pollInteral = setInterval(() => {
      self.setTorrents();
    }, 750);
  }

  detached() {
    clearInterval(this.pollInteral);
  }

  async setTorrents(init) {
    this.torrentDatas = await this.ruTorrentService.getTorrents();
    let torrentsUpdated = this.torrentDatas.torrents;

    if (init === true) {
      this.torrents = torrentsUpdated;
      this.init = false;
    }
    else {
      for (let currentTorrent of this.torrents) {
        if (!_.some(torrentsUpdated, t => t.hash === currentTorrent.hash)) {
          _.remove(this.torrents, t => t.hash === currentTorrent.hash);
        }
      }

      for (let torrentUpdated of torrentsUpdated) {
        let torrent = _.find(this.torrents, t => t.hash === torrentUpdated.hash);
        if (torrent) {
          Object.assign(torrent, torrentUpdated);
        }
        else {
          this.torrents.push(torrentUpdated);
        }
      }
    }
    this.torrents.sort(this.sortByFn(this.sortBy, this.order));
  }

  setSorting(sortBy) {
    if (this.sortBy === sortBy) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sortBy = sortBy;
      this.order = 'asc';
    }
  }

  sortByFn(field, order, primer) {
    let reverse;
    if (order === 'asc') {
      reverse = false;
    }
    else {
      reverse = true;
    }
    var key = primer ?
      function (x) { return primer(x[field]) } :
      function (x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
  }
}
