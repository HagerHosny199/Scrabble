
var tiles=[];
var startgame = function(){ 


	var ip=document.getElementById("ip").value;
	var port=document.getElementById("port").value;
	var url;
	if(port==="")
	{
		url='ws://'+ip;
	}else{
		url='ws://'+ip+':'+port;
	}
	document.getElementById("configform").style.display="none";	
	//initializing PIXI
	let gfx = new Graphics();

	window.net = new Network();


	//net.start(1,['A','A','A','A','A','a','a'],10*60*1000-2000,0,null)
	window.socket=new WebSocket(url);

	socket.onopen = (event) => {
		console.log('connected to server');
	}
	socket.onclose = (event) => {
		$.notify(event.reason, { position: "top center" });
	}
	socket.onmessage = (event) => {
		console.log(event.data);
		var msg = JSON.parse(event.data);
		var index = msg.index;
		switch (index) {
			case guiTransitions.SERVER_SENT_START:
				msg.tiles = removeZeros(msg.tiles);
				msg.tiles = changeTilesToChar(msg.tiles);
				msg.board = changeTilesToChar(msg.board);

				net.start(msg.order, msg.tiles, msg.time, msg.score, msg.board, msg.opponent, msg.total);
				break;

			case guiTransitions.OPPONENT_PLAY_MOVE:
				msg.tiles = removeZeros(msg.tiles);
				msg.tiles = changeTilesToChar(msg.tiles);
				net.setScore(msg.score, msg.time, msg.total);
				net.play(msg.row - 1, msg.col - 1, msg.dir, msg.tiles);
				break;

			case guiTransitions.SERVER_SENT_END:
				net.end();
				break;

			case guiTransitions.SEND_SCORE_TO_GUI:
				net.setScore(msg.score, msg.time, null);
				break;

			case guiTransitions.SEND_TILES_TO_GUI:
				msg.tiles = removeZeros(msg.tiles);
				msg.tiles = changeTilesToChar(msg.tiles);
				net.completeTiles(msg.tiles);
				break;

			case guiTransitions.SERVER_SEND_INVALID:
				net.setTime(msg.total);
				console.log(msg.reason);

				$.notify("Invalid move", { position: "top center" });
				if (msg.reason)
					$.notify(msg.reason,  { position: "top center" });

				net.challengeAccepted();
				GameplayManager.get().waiting = false;
				GameplayManager.get().turn = true;
				break;

			case guiTransitions.OPPONENT_PLAY_PASS:
				net.pass();
				break;

			case guiTransitions.OPPONENT_PLAY_EXCHANGE:
				net.pass();
				break;

			case guiTransitions.OPPONENT_CHALLENEGE_ACCEPTED:
				net.challengeAccepted();
				$.notify("Opponent challenge accepted", "info", { position: "top center" });
				GameplayManager.get().board.updateScore(1, -GameplayManager.get().lastScore)
				break;
			case guiTransitions.AGENT_SEND_HINT:
				console.log(msg);
				msg.tiles = removeZeros(msg.tiles);
				msg.tiles = changeTilesToChar(msg.tiles);
				GameplayManager.get().showHint(msg.row, msg.col, msg.dir, msg.tiles);
				break;


		}
	}


	//n.exchange(['0','b','0','b','0','b','0'])
	//n.end()

}
var removeZeros = function (tiles) {

	var index = tiles.indexOf(0);
	while (index > -1) {
		tiles.splice(index, 1);
		index = tiles.indexOf(0);
	}
	return tiles;

}
var changeTilesToChar = function (tiles) {
	for (i = 0; i < tiles.length; i++) {
		if (tiles[i] > 0) {
			if (tiles[i] == 100) tiles[i] = " ";
			else
				if (tiles[i] > 100)
					tiles[i] = String.fromCharCode('a'.charCodeAt() + tiles[i] - 100 - 1);
				else
					tiles[i] = String.fromCharCode('A'.charCodeAt() + tiles[i] - 1);
		}
	}
	return tiles;
}
