var tiles=[];
window.onload = function(){ 

	//initializing PIXI
    let gfx = new Graphics();    
	let net = new Network();
	window.net = new Network(); 
	//net.start(1,['A','A','A','A','A','a','a'],10*60*1000-2000,0,null)
	window.socket=new WebSocket('ws://localhost:5202');

	socket.onopen=(event)=>{
		console.log('connected to server');
	}
	socket.onmessage=(event)=>{
		console.log(event.data);
		var msg=JSON.parse(event.data);
		var index=msg.index;
		switch(index)
		{
			case guiTransitions.SERVER_SENT_START:
				msg.tiles=removeZeros(msg.tiles);
				msg.tiles=changeTilesToChar(msg.tiles);
				net.start(msg.order,msg.tiles,msg.total,msg.score,msg.board);
				break;
			
			case guiTransitions.OPPONENT_PLAY_MOVE:
				msg.tiles=removeZeros(msg.tiles);
				msg.tiles=changeTilesToChar(msg.tiles);
				net.setScore(msg.score,msg.time,msg.total);
				net.play(msg.row-1,msg.col-1,msg.dir,msg.tiles);
				break;
			
			case guiTransitions.SERVER_SENT_END:
				net.end();
				break;
			
			case guiTransitions.SEND_SCORE_TO_GUI:
				net.setScore(msg.score,100,100);
				break;

			case guiTransitions.SEND_TILES_TO_GUI:
				msg.tiles=removeZeros(msg.tiles);
				msg.tiles=changeTilesToChar(msg.tiles);
				net.completeTiles(msg.tiles);
				break;

			case guiTransitions.SERVER_SEND_INVALID:
				net.setTime(msg.total);
				console.log(msg.reason);

				$.notify("Invalid move", {position: "top center"});	
				$.notify(msg.reason);

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

				$.notify("Opponent challenge accepted", "info", {position: "top center"});
				GameplayManager.get().board.updateScore(1,-GameplayManager.get().lastScore)

				break;

		}
	}

	
	
	//n.exchange(['0','b','0','b','0','b','0'])
	//n.end()

}
var removeZeros=function(tiles)
{
	
	var index = tiles.indexOf(0);
	while (index > -1) {
		tiles.splice(index, 1);
		index=tiles.indexOf(0);
	}
	return tiles;
	
}
var changeTilesToChar=function(tiles)
{
	for(i=0;i<tiles.length;i++)
	{
		if(tiles[i]==100)
			tiles[i]=' ';
		else
			tiles[i]=String.fromCharCode('A'.charCodeAt()+tiles[i]-1);
	}
	return tiles;
}
