'use strict';
class Model{
  constructor(dbLeaderBoard){
    this.dbLeaderBoard = dbLeaderBoard;
    // console.log(this.dbLeaderBoard)
    
  }
  request(action, newPlayerData=null){
    if(action === 'addNewPlayerIntoDB'){
      this.addNewPlayerIntoDB(newPlayerData);
    }
  }

  addNewPlayerIntoDB(newPlayerData){
    // console.log(newPlayerData);
    this.dbLeaderBoard.push(newPlayerData);
    // console.log(this.dbLeaderBoard);
    return true;
  }

  
  
}
