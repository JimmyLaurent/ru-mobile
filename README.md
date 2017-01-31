# RuMobile

RuMobile is a mobile plugin for ruTorrent (supports all moderns smartphones).

## Features

- Basic management of your torrent list (play, pause, delete)
- Search and add new torrents in pair with the "extsearch" plugin (a lot of torrent providers are availables).

## Screenshots

<img src="https://cloud.githubusercontent.com/assets/25406553/22475398/dee44b10-e7ac-11e6-83f3-361faa7af533.png" width="400">


## Installation
Latest Release: https://github.com/JimmyLaurent/ru-mobile/releases/download/1.0.0/ru-mobile-1.0.0.zip

First, you need to install "extsearch", "seedingtime" and "erasedata" plugins.
Then download the lastest release and unzip it under the plugins folder of ruTorrent.

> **Note:** NOTE: Doesn't work well with ipad plugin.

You can access the plugins via the url: http://YOUR_RUTORRENT_URL/?rumobile=1

#### Building from source

    $ npm install
    $ npm build:prod

The build will be placed in the dist directory.

Take also 'init.js' and 'plugin.info' from the root folder.


## License

MIT © 2017 [Jimmy Laurent](https://github.com/JimmyLaurent)
