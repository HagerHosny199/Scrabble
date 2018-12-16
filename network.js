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
	start: function (order, initTiles, timer, score, initBoard, opScore = null, total = null) {
		let turn = true
		//init the gameManager this will init the board 
		window.gameManager = new GameplayManager()
		window.gameManager.init()
		//set the first player
		if (order == 2) turn = false
		gameManager.setTurn(turn)
		//init the board
		gameManager.initBoard(initBoard)
		//generate tiles 
		gameManager.generateUsersTiles(initTiles)
		//set the score
		if (opScore)
			gameManager.board.updateScore(2, opScore)

		gameManager.board.updateScore(order, score)
		//set the timer
		gameManager.board.updateTime(order, timer)
		if (total)
			gameManager.board.updateGameTime(total);

	},
	//play : this function get (col,row,dir,tiles)
	//1-set the tiles (if there is a tile in the board skip this cell & if the index==0 skip it)
	play: function (row, col, dir, tilesChars) {
		GameplayManager.get().lastPlayed = [];
		//if (GameplayManager.get().turn) GameplayManager.get().turn = false;
		let currentLocation = { row: row, col: col }
		for (let i = 0; i < tilesChars.length; i++) {
			while (!GameplayManager.get().isEmpty(currentLocation.row, currentLocation.col)) {
				if (dir == 0) currentLocation.col++;
				else currentLocation.row++;
				if (currentLocation.col > 14 || currentLocation.row > 14)
					return; //not playable
			}
			GameplayManager.get().selectTile(tilesChars[i])
			GameplayManager.get().boardClick(currentLocation.row, currentLocation.col)

		}
		//GameplayManager.get().turn=!GameplayManager.get().turn
	},
	//score: this function get the score needed to be parsed
	score: function (userScore) {
		let player = 1
		if (GameplayManager.get().turn == false)
			player = 2
		//update the score
		GameplayManager.get().updateScore(player, userScore)
		//set the OK action
		GameplayManager.get().boardClick(0, 0, 'OK')
	},
	//pass:this function tell the user to trigger the (turn) player flag
	pass: function () {
		// set the OK action
		// da ghalat ??
		// GameplayManager.get().boardClick(0,0,'OK')
		GameplayManager.get().turn = true;
		GameplayManager.get().waiting = false;
		GameplayManager.get().lastPlayed = [];

	},
	//end:this is the termination of the game
	end: function () {
		let endGame = new End();
		let score=Score.get();
		let AI=parseInt(score.score2.text);
		let human=parseInt(score.score1.text);
		//empty the grid
		for (let row = 0; row < 15; row++) {
			GameplayManager.get().grid.push([]);
			for (let col = 0; col < 15; col++)
				GameplayManager.get().grid[row].push(".");
		}
		if(AI>human)
			$.notify("LoOoOoOoser yeeeee :P ",  { position: "top center" });
		else if(human>AI)
			$.notify("Congratulations msh bnfs -_-",  { position: "top center" });
		else
			$.notify("Draw !!",  { position: "top center" });
		
		
	},
	challengeAccepted: function () {
		mngr = GameplayManager.get();
		for (let i = 0; i < mngr.lastPlayed.length; i++) {

			mngr.grid[mngr.lastPlayed[i].row][mngr.lastPlayed[i].col] = '.'
			mngr.lastPlayed[i].row = undefined;
			mngr.lastPlayed[i].col = undefined;
			mngr.availableTiles++;
			//mngr.lastPlayed[i].used = false;
		}
		for (let i = 0; i < 7; i++) {
			mngr.userTiles[i].container.position.x = 145 + 29 * (i);
			mngr.userTiles[i].container.position.y = 623;
			mngr.userTiles[i].setUsed(0);
			if (mngr.userTiles[i].blank == true)
				mngr.userTiles[i].container.children[2].text = ' ';
		}
		//mngr.waiting = false;
		//mngr.turn = true;
		mngr.lastPlayed = [];

	},
	//exchnge:this function receive the exchanged tiles 
	//1-update the tiles 
	//2-Pass the game 
	exchange: function (tiles) {
		console.log("from rec exchange")
		//check if it is valid or not 
		if (tiles.length == 0)
			//not valid state 
			console.log("not valid");
		else {
			//update the tiles 
			for (var i = 0; i < 7; i++) {
				if (tiles[i] != '0') {
					GameplayManager.get().userTiles[i].container.children[2].text = tiles[i]
					//this line should be changed
					//GameplayManager.get().userTiles[i].container.children[3].text=value
				}
			}
			//pass the game
			this.pass();
		}
	},
	//this function send request to the server to exchange 
	sendExchange: function (tiles, exchangedTiles) {
		console.log("from send exchange")
		let userTiles = []
		let tempChar;
		for (var i = 0; i < 7; i++) {
			if (exchangedTiles[i] == 1) {
				tempChar = tiles[i].container.children[2].text;

				if (tempChar != ' ')
					userTiles[i] = tempChar.charCodeAt(0) - 64;
				else
					userTiles[i] = 100;
			}
			else
				userTiles[i] = '0'
		}
		//here send userTiles 
		var move = {};
		move.tiles = userTiles;
		move.index = guiTransitions.THINKING_SEND_EXCHANGE_TO_S;
		console.log(move);
		window.socket.send(JSON.stringify(move));

	},
	//this function send pass to the server 
	sendPass: function () {
		var move = {};
		move.index = guiTransitions.THINKING_SEND_PASS_TO_S;
		GameplayManager.get().turn = false;
		window.socket.send(JSON.stringify(move));

	},
	//this function send the human play to the server
	sendPlay: function (row, col, dir, tiles) {
		var move = {};
		move.row = row + 1;
		move.col = col + 1;
		move.dir = dir;
		move.tiles = tiles;
		move.index = guiTransitions.THINKING_SEND_PLAY_TO_S;
		console.log(move);
		window.socket.send(JSON.stringify(move));
	},
	//this function get the score of the player and update the termination condition
	setScore: function (myScore, time, totalTime) {
		//time ->remaining time for a user 
		//totalTime->remainingTime for the game 
		//getting the order
		let order = 1 //by defaukt human
		if (GameplayManager.get().turn == false) order = 2
		//update the game remaining time
		if (totalTime)
			GameplayManager.get().board.updateGameTime(totalTime)
		//update user remaintime for the user 
		if (time)
			GameplayManager.get().board.updateTime(1, time)
		//update user score 
		GameplayManager.get().board.updateScore(order, myScore)
		//trigger the turn
		if (GameplayManager.get().turn) {
			GameplayManager.get().lastScore = myScore;
			GameplayManager.get().turn = !GameplayManager.get().turn;
			GameplayManager.get().waiting = false;
		}
	},
	//this function update the game remaining time
	setTime: function (time) {
		//update the game remaining time
		//GameplayManager.get().board.updateGameTime(totalTime)

		GameplayManager.get().board.updateGameTime(time)
	},
	completeTiles: function (tiles) {
		console.log("from rec exchange", tiles)
		let mngr = GameplayManager.get();
		[mngr.tileAppend, mngr.availableTiles, mngr.userTiles] = mngr.bag.completeTiles(mngr.userTiles, mngr.availableTiles, mngr.tileAppend, tiles);
		if (mngr.exchange == true)
			mngr.setExchange();
	},
	requestHint: function () {
		let mngr = GameplayManager.get();
		let tilestoSend = [];
		for (let i = 0; i < 7; i++) {
			tilestoSend[i] = mngr.userTiles[i].container.children[2].text;
			if (tilestoSend[i] == " ") tilestoSend[i] = 0;
			else
				if (tilestoSend[i] >= "A" && tilestoSend[i] <= "Z")
					tilestoSend[i] = tilestoSend[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
				else
					tilestoSend[i] = tilestoSend[i].charCodeAt(0) - 'a'.charCodeAt(0) + 100 + 1;

		}
		var move = {};
		move.index = guiTransitions.GUI_REQUEST_HINT;
		move.tiles = tilestoSend;
		console.log(move.tiles);
		window.socket.send(JSON.stringify(move));
	}

}
