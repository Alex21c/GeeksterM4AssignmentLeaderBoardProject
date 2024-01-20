'use strict';
let view = new View(dbCountries, dbEmojis, dbLeaderBoard);
let model = new Model(dbLeaderBoard);
let contoller = new Controller(view, model);



