class Player {
    constructor(){
      this.index = 0;
      this.distance = 0;
      this.name = null;
      this.playerState= false;
      this.count=0;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
      console.log("playerCount"+playerCount);
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
      console.log("updateCount"+count);
    }
  
    update(){
      console.log("player.update();"+this.index+this.name);
      var playerIndex = "players/player" + this.index;
      database.ref("/players/player"+this.index).update({
        name:this.name,
        distance:this.distance,
        playerState:this.playerState
      });
     
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }


    getAlivePlayers(){
      database.ref('AlivePlayers').on("value",(data)=>{
        this.count=data.val()
      })
    }
    static updateAlivePlayer(count){
      database.ref('/').update({
        AlivePlayers:count
      })
    }
  }
  