import { inject, bindable } from 'aurelia-framework';
import { RuTorrentService } from '../../services/rutorrent-service';
import F7 from '../../services/framework7';

@bindable('torrents')
@inject(RuTorrentService)
export class TorrentList {
  
  constructor(ruTorrentService) {
    this.ruTorrentService = ruTorrentService;
    this.f7 = new F7();
  }

  async toggleTorrentState(torrent) {
    this.f7.showIndicator();
    try {
      await this.ruTorrentService.toggleTorrentState(torrent);
    }
    finally {
      this.f7.hideIndicator();
    }
  }

  async deleteTorrent(torrent, t) {
    let self = this;
    this.f7.confirm(theUILang.Rem_torrents_prompt, theUILang.Remove,
      async () => {
        self.f7.showIndicator();
        try {
          await self.ruTorrentService.deleteTorrent(torrent.hash);
          self.f7.addNotification({
            message: 'Torrent deleted',
            hold: 2000
          });
        }
        catch (e) {
          self.f7.addNotification({
            message: 'Error ' + e.toString(),
            hold: 2000
          });
        }
        finally {
          self.f7.hideIndicator();
        }
      });
  }
}
