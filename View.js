'use strict';
class View{
  constructor(countriesDb, dbEmojis, dbLeaderBoard){
    // Setting data    
      this.css ={
        // plusMinusFive: 'rounded-full p-2 pl-4 pr-4 text-slate-50 bg-slate-500 hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300',
        plusMinusFive: 'transition-all rounded-full  bg-gray-300 hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 font-semibold w-14 h-14',
        deleteBin: 'transition-all  rounded-full text-slate-50 bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 w-14 h-14',
        liBgColor: '',
        formInputs: 'bg-slate-400 p-2 text-zinc-50 placeholder:text-slate-200  rounded-md focus:outline-none focus:ring focus:ring-emerald-700',
      };    
    // preparing the GUI
      this.inputForm = document.querySelector('form#inputForm');
      
      this.generateInputFormData();
    // rest of the work
      this.countriesDb = countriesDb;
      this.dbEmojis = dbEmojis;
      this.dbLeaderBoard = dbLeaderBoard;
      this.playerCountry = document.querySelector('select#playerCountry');
      this.playerAvatar = document.querySelector('select#playerAvatar');
      this.leaderBoardPlayersList = document.querySelector('ul#leaderBoardPlayersList');    
      

      this.generateCountriesSelectTag();
      this.generateAvatarSelectTag();
      this.generateLeaderboardPlayersList();

    // animation image
      this.animationImg = document.createElement('img');
      
      


      
    


    // console.log(this.computeTodayDate());

  }

  showSortingAnimation(){
    this.leaderBoardPlayersList.innerHTML = '';
    this.animationImg.setAttribute('src','Images/heapSort.gif');
    this.leaderBoardPlayersList.append(this.animationImg);
  }

  generateInputFormData(){
   let data = `
   <div class="flex flex-row">
      <select class="${this.css.formInputs} text-9xl " id="playerAvatar"></select>
    </div>
    <div class="wrapperInputs flex flex-col gap-1" >
      <input class="${this.css.formInputs} text-xl" type="text" placeholder="First Name" id="firstName" required>
      <input class="${this.css.formInputs} text-xl" type="text" placeholder="Last Name" id="lastName">
      <input class="${this.css.formInputs} text-xl" type="number" placeholder="Score" id="score" min="0" max="100" required>
      <select class="${this.css.formInputs} text-xl" id="playerCountry"></select>
      <input type="submit" value="Add Player" class ="transition-all  text-zinc-50 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 focus:outline-none focus:ring focus:ring-emerald-500  rounded-md cursor-pointer p-1 h-14 font-semibold text-2xl">
    </div>   
`;
    // console.log('our form is', this.inputForm);
    this.inputForm.innerHTML = data;

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
    // console.log('here is the css', this.css);
    // first thing is : sort them
    // sorting in descending order
      this.dbLeaderBoard.sort((player1, player2)=>player2.score-player1.score); 
    
    // Generating list
      this.leaderBoardPlayersList.innerHTML = '';
      let playerRank =1;
      this.dbLeaderBoard.forEach((player)=>{

        // fetching data
          let name = player.firstName + ' ' + player.lastName;
          let timeStamp = player.timeStamp; 
          let country = player.country;
          let score = player.score;
          let avatar = player.avatar;
          let playerId = player.id;
//  class='bg-slate-500         
        // generating inner tags
          let li = document.createElement('li');    
          // li.setAttribute('primaryKey', primaryKey)      
          if(playerRank === 1){
            this.css.liBgColor = 'bg-amber-500 border-b-2';
          }else if(playerRank === 2){            
            this.css.liBgColor = 'bg-emerald-700 border-b-2';
          }else if(playerRank === 3){            
            this.css.liBgColor = 'bg-sky-900 border-b-2';
          }else{
            this.css.liBgColor = 'bg-slate-800 border-b-2';
          }
          li.classList=`${this.css.liBgColor} text-slate-50 p-3 flex flex-row justify-center gap-24 w-4/5 rounded-md  border-slate-300 items-center`;

          li.innerHTML=
`
        <span class='avatar text-9xl'>${avatar}</span>
        <div class='wrapperPlayerNameAndTimeStamp flex flex-col'>
          <span class='font-semibold text-2xl'>${name}</span>
          <span class='italic text-gray-300'>${timeStamp}</span>        
        </div>
        <div class='wrapperFlagAndCountryName flex items-center text-gray-300 gap-1'> 
          <img class='w-14' src='${this.getCountryFlagImage(country)}'>
          <span>${country}</span>
        </div>

        <span class='text-4xl'>${score}</span>
        <div class='wrapperPlusAndMinus5 flex flex-row gap-1'>
          <button playerId='${playerId}' name='btnPlusFive' class='${this.css.plusMinusFive} text-green-700 '>+5</button> 
          <button playerId='${playerId}' name='btnMinusFive' class='${this.css.plusMinusFive} text-red-700'>-5</button> 
        </div>
               
        <button playerId='${playerId}' name='btnDeletePlayer' class="fa-duotone fa-trash ${this.css.deleteBin}"></button> 
`;
        this.leaderBoardPlayersList.append(li);

        // console.log(name, timeStamp, country, score, avatar);
        

        ++playerRank;
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
