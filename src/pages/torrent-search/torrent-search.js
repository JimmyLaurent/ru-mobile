import { inject } from 'aurelia-framework';
import F7 from '../../services/framework7';
import { RuTorrentService } from '../../services/rutorrent-service';
import { TorrentSearchService } from '../../services/torrent-search-service';


@inject(RuTorrentService, TorrentSearchService)
export default class TorrentSearch {
  constructor(ruTorrentService, torrentSearchService) {
    this.title = 'Torrent search';
    this.ruTorrentService = ruTorrentService;
    this.torrentSearchService = torrentSearchService;
    this.f7 = new F7();
    this.vm = this;
  }

  attached() {
    this.f7.searchbar(this.searchBar);
  }

  activate() {
    this.sites = this.torrentSearchService.getProviders();
    this.selectedSite = this.sites[0];
  }

  async searchTorrents() {
    this.queryInput.blur();
    this.f7.showIndicator();
    try {
      this.torrents = await this.torrentSearchService.search(this.selectedSite.name, this.selectedCategory, this.queryText);
    }
    finally {
      this.f7.hideIndicator();
    }
  }

  async download(torrent) {
    this.f7.showIndicator();
    let torrentAdded = false;
    try {
      torrentAdded = await this.ruTorrentService.addTorrent(torrent.link);
    }
    finally {
      this.f7.addNotification({
        message: torrentAdded ? 'Torrent added' : 'Error',
        hold: 2000
      });
      this.f7.hideIndicator();
    }
  }

  async goToTorrentDetail(torrent) {
    this.currentTorrent = torrent;
  }
}
