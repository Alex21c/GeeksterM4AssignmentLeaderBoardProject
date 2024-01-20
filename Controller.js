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
    document.querySelector('form#inputForm').addEventListener('submit', (event)=>this.addNewPlayer(event));
  }

  addNewPlayer(event){
    event.preventDefault();
    // fetch form data
    // console.log('controller is adding new player')
      let newPlayerData ={
        id: Date.now(), // kind of primary key to uniquely identify each user
        firstName: this.formElement.firstName.value,
        lastName : this.formElement.lastName.value,
        score: this.formElement.score.value,
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
