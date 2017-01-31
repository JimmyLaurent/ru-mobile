
export default class App {

  configureRouter(config, router) {
    config.map([
      { route: ['','list'], name: 'list', moduleId: './pages/torrent/torrent', nav: true, title: 'Torrent list', settings: { icon: 'view_list' } },
      { route: [ 'search'], name: 'search', moduleId: './pages/torrent-search/torrent-search', nav: true, title: 'Torrent search', settings: { icon: 'search' } }
    ])
    this.router = router
  };
}
