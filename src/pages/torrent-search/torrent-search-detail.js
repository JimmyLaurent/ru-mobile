import { inject, bindable } from 'aurelia-framework';
import { TorrentSearchService } from '../../services/torrent-search-service';
import { AnimationHelper } from '../../helpers/animation-helper';
import F7 from '../../services/framework7';


@bindable('torrent')
@bindable('parentVm')
@inject(TorrentSearchService, AnimationHelper)
export class TorrentSearchDetail {

  constructor(torrentSearchService, animationHelper) {
    this.f7 = new F7();
    this.torrentSearchService = torrentSearchService;
    this.animationHelper = animationHelper;
  }

  async torrentChanged(torrent) {
    if (torrent) {
      this.f7.showIndicator();
      let infos = await this.torrentSearchService.getDetail(torrent);
      this.f7.hideIndicator();

      if (infos === null) {
        this.torrentDetails.appendChild(this.createIframe(torrent.desc));
      }
      else {
        this.torrentDetails.innerHTML = infos;
      }
      this.animationHelper.animatePages('main-page', 'torrent-detail', 'to-left');
    }
  }

  back() {
    this.animationHelper.animatePages('main-page', 'torrent-detail', 'to-right');
    this.torrentDetails.innerHTML = '';
    this.torrent = null;
  }

  createIframe(url) {
    let iframe = document.createElement('iframe');
    iframe.frameborder = '0';
    iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
    iframe.setAttribute("class", 'urlIframe');
    iframe.src = url;
    return iframe;
  }
}
