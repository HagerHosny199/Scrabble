
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
 
    tile2._container.position.set(100,200)
    tile3._container.position.set(300,323)
    tile2._container.children[2].text='B'



    let hand = new Hand(app);
    board.setHand(hand);
    app.ticker.add(function(delta) {
        //hand._container.rotation = 0.002 * delta * window.mouseX - 1;
    });


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