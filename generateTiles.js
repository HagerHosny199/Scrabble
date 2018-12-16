let GenerateTiles= function(app,board,userTiles){
	this.app=app;
	this.board=board;
	this.container;
	this.bag;
	this.go=null;
	this.sound;
	this.tiles=[];
	this.chars=[];
	this.bagValues=[];
	this.values=[];
	this.availableTiles=[];
	this.framePath = 'assets/resultboard.png';
	this.frameSprite;
	this.userTiles=userTiles
	GenerateTiles.instance=this;
	this.init(app);
	
}
//el function de el logic bt3ha 8lt bs lma get 3mlt el instance henak f el manger mshfhash 
GenerateTiles.get=function()
{
	return GenerateTiles.instance;
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
		//this.frameSprite.position.set(1190,700);
		this.frameSprite.position.set(-120,700);
		this.container.scale.set(0.3); 
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
		//start exchange
		GameplayManager.get().setExchange();
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
		var x=394;
		var y=-350;
		var j=0;
		//create array of the tiles 
		for(var i=0;i<this.userTiles.length;i++)
		{
			//generate new tiles to be used with the exchange
			this.tiles[i]=new Tile();
			this.tiles[i].container.position.set(x,y);
			this.tiles[i].container.children[2].text=this.userTiles[i].container.children[2].text;
			this.tiles[i].container.children[3].text=this.userTiles[i].container.children[3].text;
			this.availableTiles[i]--;
			this.tiles[i].container.scale.set(0.7); 
			//new line so we need to update the x,y
			if((i+1)%3==0)
			{
				y+=40;
				x=394;
			}
			else
			{
				x+=40;
			}
			if(this.userTiles[i].getUsed()==1)
				this.tiles[i].container.position.set(-100,-100);
		
			
		}
		
		
	},
	loop:function(app){
	app.render(this.container);
		this.frameSprite.position.x += 60; 
		if(this.frameSprite.position.x==1140)
			{
				this.go= new Button(this.app,'go','go2','go2') ;
				this.ticker.stop();
			}
		
	},
	loop2:function(app){
	app.render(this.container);
		this.go.sprite.y=-375;
		this.frameSprite.position.x -= 70; 
		if(this.frameSprite.position.x<=-420)
			{
				this.ticker.stop();	  // el error hna , bsbab en boardclick hna gowa loop, we fi error by7sl gwa by5liha matekmalsh fa my3mlsh stop el ticker HAGER	
				this.container.destroy();
				GameplayManager.get().boardClick(0, 0,null);
			}
		
	},
	loopTiles:function(app){
	app.render(this.container);
		for(var i=0;i<this.tiles.length;i++)
		{  
			if(this.userTiles[i].getUsed()==0)
				this.tiles[i].container.position.y += 30; 
		}
	},
	loopTiles2:function(app){
	app.render(this.container);
		for(var i=0;i<this.tiles.length;i++)
			this.tiles[i].container.position.y -= 30; 
	},
	removeBorad:function(){
	///create a ticker
	this.ticker  =  new PIXI.ticker.Ticker();
	this.ticker.add((deltaTime) => {
		this.loop2(this.app);
	});
	this.ticker.start();
	this.ticker.add((deltaTime) => {
		this.loopTiles2(this.app);
	});
	},
	getTiles:function()
	{
		return this.tiles;
	}
	
	
	
	
};
