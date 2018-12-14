var tiles=[];
window.onload = function(){ 

	//initializing PIXI
    let gfx = new Graphics();    
	let net = new Network();
	window.net = new Network(); 
	net.start(2,['A','A','A','A','A','a','a'],10*60*1000-2000,0,null)
	/*window.socket=new WebSocket('ws://localhost:5202');
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
				console.log("INVALIIDDDDDDDDDDDDDDDD!!!!!");
				console.log(msg.reason);
				break;

			case guiTransitions.OPPONENT_PLAY_PASS:
				net.pass();
				break;

			case guiTransitions.OPPONENT_PLAY_EXCHANGE:
				net.pass();
				break;

			case guiTransitions.OPPONENT_CHALLENEGE_ACCEPTED:
				net.challengeAccepted();
				break;

		}
	}
	*/
	
	
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
		tiles[i]=String.fromCharCode('A'.charCodeAt()+tiles[i]-1);
	}
	return tiles;
}
