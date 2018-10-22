let Tile= function(app,board,num){
	this.position; //this represents the tile pos in the board
	this.value; //this represents the value of the tile 
	this.tileText; //this represents the tile character
	this.container; //this is our container :D 
	this.tileSprite; //used to load the tile image
	this.shadowSprite; //used to add shadow to the tile
	this.app=app;
	this.board=board;
	
	this.tilePath = 'assets/blank-tile.png';
    this.shadowPath = 'assets/blank-tile-shadow.png';
    this.clickable = true; //true on my turn only
    this.visible = true;

	this.init(app);
}

Tile.prototype = {
    init: function(app){
		//create container
		this.container = new PIXI.Container();
		//assign the container for the global one for rendering
		app.stage.addChild(this.container);
		
		// create a new Sprite from an image path
        this.tileSprite = PIXI.Sprite.fromImage(this.tilePath);          
        this.shadowSprite = PIXI.Sprite.fromImage(this.shadowPath);
		
		//create text style
		let style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 28, dropShadow: true, dropShadowColor: '#000000',
			dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		//assign the style and the defualt char
		this.tileText = new PIXI.Text('A', style);
		
		//adding shadow to the tile
        this.shadowSprite.x = -7; 
		this.shadowSprite.y = -3;
		//set the text position
        this.tileText.x = 12;
		this.tileText.y = 6;
		
		//make the tile clickable
        this.tileSprite.interactive = this.clickable;
        this.tileSprite.buttonMode = this.clickable;
		
		//adding child to the container so we can update them 
        this.container.addChild(this.shadowSprite);
        this.container.addChild(this.tileSprite);
        this.container.addChild(this.tileText);
		
		//set the container width & height ...etc
        this.container.pivot.x = 22;
        this.container.pivot.y = 22;
        this.container.x = app.screen.width / 2;
        this.container.y = app.screen.height / 2;   
        this.container.scale.set(0.7); 
		
		this.animation=0;
		//this.initTiles(0.01);
		// important note: el event el byndah el onclick kan hwa el 'this' fa 3amlt mwdo3 bind da
        // bind(this) bet return function gdida wel this bta3etha hya el 7aga el ana ba3ethalha! wow
        this.tileSprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
		
},






	//ba3d kda msh hynfa3 yb2a el tile l hya el fiha el hy7sal fl onclick , mfrod yb2a fi 7ad kbir shayef
    //we y2olha lama hya bs t2ol 7ad dasni , 3ashan hyb2a fi relations ben el tiles wel hand , we kolo mstani ba3d
    // msh kol wa7ed bytsaraf lwa7do 
    myonClick: function(){
        //console.log(this)
        this.container.rotation += 0.05;
        if (this.dummy){
            this.dodo = this.dummFunc.bind(this) //da lazmto eni b7awesh pointer 3l function el gdida el rag3ali mn el bind 3ashan lma a2ol remove y3rf hyshil min
            // we da kolo asln 3ashan lma ba3at el function mn gher bind, el this etghyaret
            this.app.ticker.add(this.dodo);
        } else {
            this.app.ticker.remove(this.dodo);
        }
        this.dummy = !this.dummy;

        this.board.selectTile(this);
    },

    dummFunc: function(delta){
        this.container.rotation += 0.03 * delta;
    },
	
	
};

