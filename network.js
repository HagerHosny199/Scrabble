let Network = function () {
Network.instance = this;
} 

Network.prototype = {
	//start : this function get the first state of the game 
	//1-init the board 
	//2-generate the tiles
	//3-set the first player --> order=1 human order=2 AI
	//4-set the score 
	//5-set the timer
	start: function(order,initTiles,timer,score,initBoard){
		let turn=true
		//init the gameManager this will init the board 
		let gameManager = new GameplayManager()
		//set the first player
		if(order==2) turn =false
		gameManager.setTurn(turn)
		//init the board
		gameManager.initBoard(initBoard)
		//generate tiles 
		gameManager.generateUsersTiles(initTiles)
		//set the score
		gameManager.board.updateScore(order,score)
		//set the timer
		gameManager.board.updateTime(order,timer)

	},
	//play : this function get (col,row,dir,tiles)
	//1-set the tiles (if there is a tile in the board skip this cell & if the index==0 skip it)
	play:function(row,col,dir,tilesChars){
		let currentLocation = {row: row, col:col}
		for (let i = 0; i < tilesChars.length; i++){
			while( !GameplayManager.get().isEmpty(currentLocation.row, currentLocation.col) )
				if (dir==0) currentLocation.col++;
				else currentLocation.row++;
			GameplayManager.get().selectTile(tilesChars[i])
			GameplayManager.get().boardClick(currentLocation.row, currentLocation.col)
		}
	},
	//score: this function get the score needed to be parsed
	score:function(userScore){
		let player=1
		if(GameplayManager.get().turn==false)
			player=2
		//update the score
		GameplayManager.get().updateScore(player,userScore)
		//set the OK action
		GameplayManager.get().boardClick(0,0,'OK')
	},
	//pass:this function tell the user to trigger the (turn) player flag
	pass:function(){
		//set the OK action
		GameplayManager.get().boardClick(0,0,'OK')
	},
	//end:this is the termination of the game
	end:function(){
		let endGame=new End();
	},
	//exchnge:this function receive the exchanged tiles 
	//1-update the tiles 
	//2-Pass the game 
	exchange:function(tiles){

		//check if it is valid or not 
		if(tiles.length==0)
			//not valid state 
			console.log("not valid");
		else
		{
			//update the tiles 
			for(var i=0; i<7;i++)
			{
				if(tiles[i]!='0')
				{
					GameplayManager.get().userTiles[i].container.children[2].text=tiles[i]
					//this line should be changed
					//GameplayManager.get().userTiles[i].container.children[3].text=value
				}
			}
			//pass the game
			this.pass();
		}
	},
	//this function send request to the server to exchange 
	sendExchange:function(tiles,exchangedTiles){
		userTiles=[]
		for(var i =0 ;i<7;i++)
		{
			if(exchangedTiles[i]==1)
				userTiles[i]=tiles[i].container.children[2].text;
			else
				userTiles[i]='0'
		}
		//here send userTiles 

	},
	//this function send pass to the server 
	sendPass:function(){
		
	}
	
}
