var tiles=[];
window.onload = function(){ 

    //initializing PIXI
    let gfx = new Graphics();    
    let board = new Board();
	let bag=new Bag();
	var user1=bag.generateUserTiles(7);
	console.log(user1);
	for(var i=0;i<7;i++)
	{
		tiles[i]=new Tile();
		tiles[i].container.position.set(145+29*i,623);
		tiles[i].container.children[2].text=user1[i];
	}

    //to test player2 
    // type in console : 
    // GameplayManager.get().selectedTile = tiles[0]
    // GameplayManager.get().boardClick(1,2)

    //create the gameManager when the game starts , not in the menu
    let gameManager = new GameplayManager();

	//let reward=new Reward(app);
	//let gen=new GenerateTiles(app,board);

}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}