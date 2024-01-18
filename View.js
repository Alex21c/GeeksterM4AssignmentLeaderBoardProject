'use strict';
class View{
  constructor(countriesDb, dbEmojis, dbLeaderBoard){
    this.countriesDb = countriesDb;
    this.dbEmojis = dbEmojis;
    this.dbLeaderBoard = dbLeaderBoard;
    this.playerCountry = document.querySelector('select#playerCountry');
    this.playerAvatar = document.querySelector('select#playerAvatar');
    this.leaderBoardPlayersList = document.querySelector('ul#leaderBoardPlayersList');    
    this.generateCountriesSelectTag();
    this.generateAvatarSelectTag();
    this.generateLeaderboardPlayersList();

  }
  getCountryFlagImage(countryName){
    for(let country of this.countriesDb){
      if(country.name.toLowerCase() === countryName.toLowerCase()){
        return country.flag_4x3;
      }
    }
    // Default
    return false;
  }
  generateLeaderboardPlayersList(){
    // first thing is : sort them
    // sorting in descending order
      this.dbLeaderBoard.sort((player1, player2)=>player2.score-player1.score); 
    
    // Generating list
      this.leaderBoardPlayersList.innerHTML = '';
      this.dbLeaderBoard.forEach((player)=>{
        // fetching data
          let name = player.firstName + ' ' + player.lastName;
          let timeStamp = player.timeStamp; 
          let country = player.country;
          let score = player.score;
          let avatar = player.avatar;
        // generating inner tags
          let li = document.createElement('li');
          li.innerHTML=
`
        <span>${avatar}</span>
        <span>${name}</span>
        <span>${timeStamp}</span>        
        <img class='flag' src='${this.getCountryFlagImage(country)}'> <span>${country}</span>
        <button>+5</button> 
        <span>${score}</span>       
        <button>-5</button> 
        <button class="fa-duotone fa-circle-xmark"></button> 
`;
        this.leaderBoardPlayersList.append(li);

        console.log(name, timeStamp, country, score, avatar);
      });
  }

  generateAvatarSelectTag(){
    this.playerAvatar.innerHTML = '';
    this.dbEmojis.forEach((avatar)=>{      
      let emoji = avatar.emoji;      
      let option = document.createElement('option');
        option.setAttribute('value',emoji);    
        if(emoji === '🦚'){
         option.setAttribute('selected',''); 
        }
          let span = document.createElement('span');
          span.innerText = emoji;
          option.append(span);
        this.playerAvatar.append(option);
    });
  }

  generateCountriesSelectTag(){
    this.playerCountry.innerHTML = '';
    this.countriesDb.forEach((country)=>{
      let name = country.name;
      // console.log(name, flag);
      let option = document.createElement('option');
        option.setAttribute('value',name);    
        if(name.toLowerCase() === 'india'){
         option.setAttribute('selected',''); 
        }
          let span = document.createElement('span');
          span.innerText = name;
          option.append(span);
        this.playerCountry.append(option);
    });
  }
}
