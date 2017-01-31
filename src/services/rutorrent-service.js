import _ from 'lodash';
import { HttpClient } from 'aurelia-http-client';

export class RuTorrentService {

  constructor() {
    this.httpClient = new HttpClient().configure(x => {
      x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
    });
  }

  async request(url) {
    return new Promise((resolve, reject) => {
      theWebUI.requestWithTimeout(url, resolve, reject, reject);
    });
  }

  async getTorrentsRaw() {
    return await this.request('?list=1&getmsg=1');
  }

  async getTorrents() {
    let self = this;
    let data = await this.getTorrentsRaw();
    let tdl = 0;
    let tul = 0;
    data.torrents =  _.map(data.torrents, function (value, hash) {
      tdl += iv(value.dl);
      tul += iv(value.ul);
      value.hash = hash;
      value.size = parseInt(value.size);
      value.created = parseInt(value.created);
      value.addtime = parseInt(value.addtime);
      value.remaining = parseInt(value.remaining);
      value.percent = Math.trunc(value.done / 10);
      value.downloadedHumanized = theConverter.bytes(value.downloaded, 2);
      value.uploadedHumanized = theConverter.bytes(value.uploaded, 2);
      value.sizeHumanized = theConverter.bytes(value.size, 2);
      value.etaHumanized = theConverter.time(value.eta);
      value.dlHumanized = theConverter.speed(value.dl);
      value.ulHumanized = theConverter.speed(value.ul);
      value.status = self.getStatus(value);
      value.isStoppable = ((value.state & dStatus.started) || (value.state & dStatus.hashing) || (value.state & dStatus.checking))
      value.isFinished = value.done === 1000;

      return value;
    });

    let zeroSpeedHumanized = '0 ' + theUILang.KB + "/" + theUILang.s;
    let tdlHumanized = tdl !== 0 ? theConverter.speed(tdl) : zeroSpeedHumanized;
    let tulHumanized = tul !== 0 ? theConverter.speed(tul) : zeroSpeedHumanized;

    return { torrents: data.torrents, totalDl: tdlHumanized, totalUl: tulHumanized };
  }

  async addTorrent(url) {
    return this.httpClient.post('php/addtorrent.php', `url=${encodeURIComponent(url)}`)
      .then((httpResponse) => {
        if (httpResponse.response.indexOf('addTorrentSuccess') !== -1) {
          return true;
        }
        return false;
      });
  }

  async toggleTorrentState(torrent) {
    var status = torrent.state;

    if ((status & dStatus.started) || (status & dStatus.hashing) || (status & dStatus.checking)) {
      await this.request('?action=stop&hash=' + torrent.hash);
    }
    else {
      await this.request('?action=start&hash=' + torrent.hash);
    }
  }

  async deleteTorrent(hash) {
    await this.request('?action=removewithdata&hash=' + hash);
  }

  async getFiles(hash) {
    let result = await this.request('?action=getfiles&hash=' + hash);
    return result[hash];
  }

  getStatus(torrent) {
    return theWebUI.getStatusIcon(torrent)[1];
  }
}
