'use strict';
try {
  let model = new Model(dbLeaderBoard);
  let view = new View(dbCountries, dbEmojis, dbLeaderBoard);
  let contoller = new Controller(view, model);
} catch (error) {
  console.error('prjGeeksterM4AssignmentLeaderBoard-Error', error);
}



