
window.onload = function(){ 

    //initializing PIXI
    let app = new PIXI.Application(1024, 680, {backgroundColor : 0x16D6EB, antialias: true, forceFXAA: true});
    document.body.appendChild(app.view);
    //PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation, da 7lw lel pixel art bs bye3ml alias fl sewar el 3adia
    PIXI.settings.RENDER_OPTIONS.antialias = true;
    let board = new Board(app);
    let tile1 = new Tile(app, board);
    let tile2 = new Tile(app, board);
    let tile3 = new Tile(app, board);
 
    tile2.container.position.set(100,200)
    tile3.container.position.set(300,323)
    tile2.container.children[2].text='B';
////////////////////////////////////////////////// hager test /////////////////////

	let bag=new Bag();
	var user1=bag.generateUserTiles();
	console.log(user1);
	var exTiles=[user1[0],user1[2]];
	console.log(bag.exchange(2,exTiles));
	let tile4 = new Tile(app, board);
	let tile5 = new Tile(app, board);
	let tile6 = new Tile(app, board);
	let tile7 = new Tile(app, board);
	
	tile1.container.position.set(145,623);
	tile2.container.position.set(173,623);
    tile3.container.position.set(201,623);
	tile4.container.position.set(229,623);
	tile5.container.position.set(257,623);
    tile6.container.position.set(285,623);
	tile7.container.position.set(313,623);
	
	
	tile1.container.children[2].text=user1[0];
	tile2.container.children[2].text=user1[1];
    tile3.container.children[2].text=user1[2];
	tile4.container.children[2].text=user1[3];
	tile5.container.children[2].text=user1[4];
    tile6.container.children[2].text=user1[5];
	tile7.container.children[2].text=user1[6];
///////////////////////////////////////////////////////////////////////////////////
    let hand = new Hand(app);
    board.setHand(hand);

    //TODO:
    // - e3ml mwdo3 el animation bta3 el eid enha lma ados 7eta tania twadi el tile fiha we temshi 
    // - e3ml l dwayer el bttla3 3l squares lama a hover 3leha
    // - e3ml 2D array bl amaken el fadya wel msh fadya 3ashan mytla3sh dwayer fl msh fadya
    // - e3ml frames tania le shakl l eid 3ashan tb2a laziza aktr

}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


    //to make Pixi fill the screen
    //app.renderer.view.style.position = "absolute";
    //app.renderer.view.style.display = "block";
    //app.renderer.autoResize = true;
    //app.renderer.resize(window.innerWidth-20, window.innerHeight-20);