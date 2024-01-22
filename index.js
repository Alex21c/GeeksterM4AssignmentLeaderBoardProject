'use strict';
let model = new Model(dbLeaderBoard);
let view = new View(dbCountries, dbEmojis, dbLeaderBoard);
let contoller = new Controller(view, model);



