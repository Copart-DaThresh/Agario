=== master

=== 0.0.8 (2020-03-05)

* Added z-index to player and players (DaThresh)
* Added cells to the game (DaThresh)
* Added adjustable cell spawn rate in the config (DaThresh)
* Added border shading to cells client side (DaThresh)

=== 0.0.7 (2020-03-02)

* Added Config YML (DaThresh)
* Added JS-Yaml (DaThresh)
* Created middleware folder (DaThresh)
* Moved request logging out of index file into middleware (DaThresh)

=== 0.0.6 (2020-02-21)

* Separated player initializing into a separate function (DaThresh)
* Added a serverId so sessions wouldn't be valid on server restart (DaThresh)
* Added a logger (DaThresh)
* Separated routes to separate file (DaThresh)
* Separated game loop to a separate file (DaThresh)

=== 0.0.5 (2020-02-19)

* Fixed previous build's issue only allowing one player to be rendered (DaThresh)

=== 0.0.4 (2020-02-19)

* Changed directional updates to a calculated function (DaThresh)
* Added in express-session, socket.io-express-session hook (DaThresh)
* Conserves player IDs based upon session (DaThresh)
* Added 'active' key to player objects (DaThresh)
* Added players as object hash (DaThresh)
* Changed socket functions to utilize player hash system (DaThresh)
* Changed playerList to be array of player IDs (DaThresh)
* Added movement speed variable (DaThresh)
* Implemented boundaries (DaThresh)

=== 0.0.3 (2020-02-18)

* Fixed removed player's rendering (DaThresh)
* Changed server position emitter to emit once per game loop (DaThresh)

=== 0.0.2 (2020-02-18)

* Added local directions reference (DaThresh)
* Added Git as system dependency inside Readme (DaThresh)
* Started implementing multiplayer (BUGGY)(DaThresh)
* Sped up game speed by 2x (DaThresh)

=== 0.0.1 (2020-02-18)

* Started making the game (DaThresh)