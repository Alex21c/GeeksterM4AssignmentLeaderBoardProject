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

  updateScore(playerId, action){
    // fetching player
    for(let player of this.dbLeaderBoard){      
        // console.log(typeof player.id, typeof playerId);
        if(String(player.id) === playerId){
          // performing action  
            if(action === 'plusFive'){
              player.score+=5;
              // Safeguard
                if(player.score > 100){
                  player.score=100;
                }
            }else if(action === 'minusFive'){              
              player.score-=5;              
              // SafeGuard
                if(player.score < 0){
                  player.score =0;
                }
            }
            // console.log(player);
          break;
        }
    }

  
      
  }
  deletePlayer(playerId){
    let idx=0;
    for(let player of this.dbLeaderBoard){      
      if(Number(player.id) === Number(playerId)){
        this.dbLeaderBoard.splice(idx, 1);
        // console.log(player);
        break;
      }
      ++idx;
    }
    // console.log(this.dbLeaderBoard);
  }
  
}
