'use strict';
class Controller{ 

  constructor(view, model){
    this.view = view;
    this.model = model;
    this.formElement={
      firstName : document.querySelector('input#firstName'),
      lastName : document.querySelector('input#lastName'),
      score: document.querySelector('input#score'),
      country: document.querySelector('select#playerCountry'),
      avatar: document.querySelector('select#playerAvatar'),      
    }
    this.leaderBoardPlayersList = document.querySelector('ul#leaderBoardPlayersList');    
    document.querySelector('form#inputForm').addEventListener('submit', (event)=>this.addNewPlayer(event));
    this.attachEventListeners();    
  }

  request(event){
    // console.log(event);
    if(event.target.nodeName.toLowerCase() === 'button'){
      let playerId = event.target.attributes.playerId.value;            
      if(event.target.attributes.name.value === 'btnPlusFive'){
        // console.log('btnPlusFive');
        this.view.showSortingAnimation();
        setTimeout(
          ()=>{
            this.model.updateScore(playerId, 'plusFive');
            this.view.generateLeaderboardPlayersList();            
          },this.view.sortingAnimationSpeed
        );
        
      }else if(event.target.attributes.name.value === 'btnMinusFive'){
        // console.log('btnMinusFive');
        this.view.showSortingAnimation();
        setTimeout(
          ()=>{
            this.model.updateScore(playerId, 'minusFive');
            this.view.generateLeaderboardPlayersList();            
          },this.view.sortingAnimationSpeed
        );        
        
      }else if(event.target.attributes.name.value === 'btnDeletePlayer'){
        // console.log('btnDeletePlayer');
        this.model.deletePlayer(playerId);
        this.view.generateLeaderboardPlayersList();
      }
    }
  }

  attachEventListeners(){
    // console.log('attaching event listeners');
    // Attaching click event listener to ul      
      this.leaderBoardPlayersList.addEventListener('click', (event)=>{this.request(event)});          
  }  
  addNewPlayer(event){
    event.preventDefault();
    // fetch form data
    // console.log('controller is adding new player')
      let newPlayerData ={
        id: Date.now(), // kind of primary key to uniquely identify each user
        firstName: this.formElement.firstName.value,
        lastName : this.formElement.lastName.value,
        score: Number(this.formElement.score.value),
        country: this.formElement.country.value,
        avatar: this.formElement.avatar.value,
        timeStamp: this.computeTodayDate()              
      };
      // console.log(newPlayerData);
    

    // request model to store this data into db
      this.model.request('addNewPlayerIntoDB', newPlayerData)
    // request view to refresh the GUI
      this.view.generateLeaderboardPlayersList();
      
    // clearing the form
      this.formElement.firstName.value='';
      this.formElement.lastName.value='';
      this.formElement.score.value='';            
      
    
  }

  computeTodayDate(){
    let date= new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      minute: "numeric",
      hour: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

}
