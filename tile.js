let Tile= function(){
	this.position; //this represents the tile pos in the board
	this.value; //this represents the value of the tile 
	this.tileText; //this represents the tile character
	this.tileValueText; //this represents the tile value
	this.container; //this is our container :D 
	this.tileSprite; //used to load the tile image
	this.shadowSprite; //used to add shadow to the tile
	this.app=Graphics.get().app;
	
	this.tilePath = 'assets/blank-tile.png';
    this.shadowPath = 'assets/blank-tile-shadow.png';
    this.tileSound = null;
    this.clickable = true; //true on my turn only
    this.visible = true;

	this.init();
}

Tile.prototype = {
    init: function(){
		//create container
		this.container = new PIXI.Container();
		//assign the container for the global one for rendering
		this.app.stage.addChild(this.container);
		
		//adding sound effect 
		this.tileSound = PIXI.sound.Sound.from('assets/tile-sound-effect.mp3');
		// create a new Sprite from an image path
        this.tileSprite = PIXI.Sprite.fromImage(this.tilePath);          
        this.shadowSprite = PIXI.Sprite.fromImage(this.shadowPath);
		
		//create text style
		let style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 28, dropShadow: true, dropShadowColor: '#000000',
			dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		let styleValue = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 10, dropShadow: true, dropShadowColor: '#000000',
			dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		//assign the style and the defualt char
		this.tileText = new PIXI.Text('A', style);
		this.tileValueText = new PIXI.Text('2', styleValue);
		this.tileValueText.position.set(30);
		
		
		
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
		this.container.addChild(this.tileValueText);
		
		//set the container width & height ...etc
        this.container.pivot.x = 22;
        this.container.pivot.y = 22;
        this.container.x = this.app.screen.width / 2;
        this.container.y = this.app.screen.height / 2;   
        this.container.scale.set(0.7); 
		
		this.animation=0;
		// important note: el event el byndah el onclick kan hwa el 'this' fa 3amlt mwdo3 bind da
        // bind(this) bet return function gdida wel this bta3etha hya el 7aga el ana ba3ethalha! wow
        this.tileSprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
	},

    myonClick: function(){
    	// if the hand is moving , don't allow any clicks
    	if (GameplayManager.get().getmovingornot()) return;

    	let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        this.container.rotation += 0.05 * plusOrMinus;
		this.tileSound.play();

		// el 7eta di kont bgrab a3ml function animation tfdal shghala , kant bt5ali l tile tlef 7walen nfsha
        // if (this.dummy){
        //     this.dodo = this.dummFunc.bind(this) //da lazmto eni b7awesh pointer 3l function el gdida el rag3ali mn el bind 3ashan lma a2ol remove y3rf hyshil min
        //     // we da kolo asln 3ashan lma ba3at el function mn gher bind, el this etghyaret
        //     this.app.ticker.add(this.dodo);
        // } else {
        //     this.app.ticker.remove(this.dodo);
        // }
        // this.dummy = !this.dummy;

        if (typeof GameplayManager.get() != 'undefined') //lw kona fl game f3ln we 3mlna initialize ll object
        	GameplayManager.get().tileClick(this);
    },

    // we di ba2i l 7etta el fo2 bta3et l laf
    // dummFunc: function(delta){
    //     this.container.rotation += 0.03 * delta;
    // },
	
	
};

