let Network = function (app,type) {

} 

Network.prototype = {
	//start : this function get the first state of the game 
	//1-init the board 
	//2-generate the tiles
	//3-set the first player
	//4-set the score 
	//5-set the timer
	start: function(order,initTiles,timer,score,initBoard){
		
	},
	//play : this function get (col,row,dir,tiles)
	//1-set the tiles (if there is a tile in the board skip this cell & if the index==0 skip it)
	play:function(row,col,dir,tiles_chars){
		let currentlocation = {row: row, col:col}
		for (let i = 0; i < tiles_chars.length; i++){
			while( !GameplayManager.get().isEmpty(currentlocation.row, currentlocation.col) )
				if (dir==0) currentlocation.col++;
				else currentlocation.row++;
			GameplayManager.get().selectTile(tiles_chars[i])
			GameplayManager.get().boardClick(currentlocation.row, currentlocation.col)
		}
	},
	//score: this function get the score needed to be parsed
	score:function(userScore){
	},
	//pass:this function tell the user to trigger the (turn) player flag
	pass:function(){
		
	}
	
}

