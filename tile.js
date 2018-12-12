let Tile= function(){
	this.position; //this represents the tile pos in the board
	this.value; //this represents the value of the tile 
	this.tileText; //this represents the tile character
	this.tileValueText; //this represents the tile value
	this.container; //this is our container :D 
	this.tileSprite; //used to load the tile image
	this.shadowSprite; //used to add shadow to the tile
	this.shadowSprite2; //used to add shadow to the tile
	this.app=Graphics.get().app;
	this.used=0;
	this.tilePath = 'assets/blank-tile.png';
    this.shadowPath = 'assets/blank-tile-shadow.png';
    this.shadowPath2 = 'assets/blank-tile-shadow-red.png';
    this.tileSound = null;
    this.clickable = true; //true on my turn only
    this.visible = true;
	this.selected=false;
    this.exchangeTiles=[0,0,0,0,0,0,0];
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
		this.shadowSprite2 = PIXI.Sprite.fromImage(this.shadowPath2);
		
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
		this.shadowSprite2.x = -7; 
		this.shadowSprite2.y = -3;
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
		//this.selected=true;
    	// if the hand is moving , don't allow any clicks
    	// if (GameplayManager.get().getmovingornot()) return;  // msh lazm dlwa2ty a3rf 3shan  mmkn ados we hwa shaghal fl 7raka 3adi , actions queue

    	let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        this.container.rotation += 0.05 * plusOrMinus;
		this.tileSound.play();
        if (typeof GameplayManager.get() != 'undefined') //lw kona fl game f3ln we 3mlna initialize ll object
        	GameplayManager.get().tileClick(this);
    },
	addShadow:function()
	{
		console.log(this.container.position.y);
		//get the tile num 
		var i=2;
		if(this.selected==false)
		{
			this.container.addChild(this.shadowSprite2);
			this.selected=true;
			//this.exchangeTiles[num]=1;
		}
		else
		{
			this.container.removeChildAt(4);
			this.selected=false;
			//this.exchangeTiles[num]=0;
		}
		console.log(this.selected);
		return this;
	},
	setUsed:function(num=1)
	{
		this.used=num;
	},
	getUsed:function()
	{
		return this.used;
	},
	getSelected:function()
	{
		return this.selected;
	}
		
	
    // we di ba2i l 7etta el fo2 bta3et l laf
    // dummFunc: function(delta){
    //     this.container.rotation += 0.03 * delta;
    // },
	
	
};

