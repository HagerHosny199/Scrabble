let GenerateTiles= function(app,board){
	this.app=app;
	this.board=board;
	this.container;
	this.bag;
	this.sound;
	this.tiles=[];
	this.chars=[];
	this.bagValues=[];
	this.values=[];
	this.availableTiles=[];
	this.framePath = 'assets/resultboard.png';
	this.frameSprite;
	this.init(app);
}

GenerateTiles.prototype={
	init:function(app)
	{
		var i=0; //temp variable
		//create container
		this.container = new PIXI.Container();
		//assign the container for the global one for rendering
		app.stage.addChild(this.container);
		
		// create a new Sprite from an image path
        this.frameSprite = PIXI.Sprite.fromImage(this.framePath); 
		this.frameSprite.position.set(-700,200);
		this.container.scale.set(0.6); 
		this.container.addChild(this.frameSprite);
		
		//create the sound effect 
		this.sound = PIXI.sound.Sound.from('assets/Metroid_Door-Brandino480-995195341.mp3');
		
		//create array of the available tiles in the global bag
		this.bag=new Bag();
		this.availableTiles=this.bag.getBag();
		//get the map of the chars
		this.chars=this.bag.getChar();
		//get the value of each tile 
		this.bagValues=this.bag.getValues();	
		
		///create a ticker
		this.ticker  =  new PIXI.ticker.Ticker();
		this.ticker.add((deltaTime) => {
			this.loop(app);
		});
		this.ticker.start();
		this.sound.play();
		//load the tiles to be rendered 
		this.loadTiles();
		this.ticker.add((deltaTime) => {
			this.loopTiles(app);
		});
		
	},
	
	loadTiles:function()
	{
		var j=0;
		var x=288;
		var y=-350;
		//create array of the tiles 
		for(var i=0;i<27;i++)
		{
			if(availableTiles[i]>0)
			{
				this.tiles[j]=new Tile(this.app,this.board);
				this.tiles[j].container.position.set(x,y);
				this.tiles[j].container.children[2].text=this.chars[i];
				this.tiles[j].container.children[3].text=this.bagValues[i];
				this.availableTiles[i]--;
				this.tiles[j].container.scale.set(1); 
				j++;
				if(j%6==0)
				{
					y+=55;
					x=288;
				}
				else
					x+=53;
			}
		}
		
		
	},
	loop:function(app){
	app.render(this.container);
		this.frameSprite.position.x += 20; 
		if(this.frameSprite.position.x==400)
			this.ticker.stop();
				
		
	},
	loopTiles:function(app){
	app.render(this.container);
		for(var i=0;i<this.tiles.length;i++)
		this.tiles[i].container.position.y += 10; 
		
	}
	
	
	
	
	
};