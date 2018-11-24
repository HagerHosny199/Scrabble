var tiles=[];
window.onload = function(){ 

    //initializing PIXI
    let gfx = new Graphics();    
    let board = new Board();
	let bag=new Bag();
	

    //to test player2 
    // type in console : 
    // GameplayManager.get().selectedTile = tiles[0]
    // GameplayManager.get().boardClick(1,2)

    //create the gameManager when the game starts , not in the menu
    let gameManager = new GameplayManager();
	
	//let reward=new Reward(gameManager.app);
	let tiles=gameManager.generateUsersTiles(7);
	//let gen=new GenerateTiles(gameManager.app,this.board,tiles);
	//tiles=bag.shuffle(tiles);
	
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}