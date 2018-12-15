let Blank= function(){
this.app=Graphics.get().app;
this.ticker;
this.container;
this.tiles=[];
this.go;
this.bag;
this.bagValues;
this.framePath = 'assets/resultboard.png';
this.frameSprite;
Blank.instance=this;
this.init(this.app);
	
}
//el function de el logic bt3ha 8lt bs lma get 3mlt el instance henak f el manger mshfhash 
Blank.get=function()
{
	return Blank.instance;
}
Blank.prototype={
	init:function(app)
	{
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
		
		this.bag=new Bag();
		//get the value of each tile 
		this.bagValues=this.bag.getValues();

		///create a ticker
		this.ticker  =  new PIXI.ticker.Ticker();
		this.ticker.add((deltaTime) => {
			this.loop(app);
		});
		this.ticker.start();

		//load the tiles to be rendered 
		this.loadTiles();
		this.ticker.add((deltaTime) => {
			this.loopTiles(app);
		});
	},
	loadTiles:function()
	{
		var x=369;
		var y=-370;
		var j=0;
		var ind=0;
		console.log("loaading")
		//create array of the tiles 
		for(var i=0;i<26;i++)
		{
			//console.log("loaading",String.fromCharCode(i))
			//generate new tiles to be used with the exchange
			this.tiles[i]=new Tile();
			this.tiles[i].container.position.set(x,y);
			this.tiles[i].container.children[2].text=String.fromCharCode(i+65);
			this.tiles[i].container.children[3].text=this.bagValues[ind++];
			this.tiles[i].container.scale.set(0.45); 
			//new line so we need to update the x,y
			if((i+1)%6==0)
			{
				y+=30;
				x=369;
			}
			else
			{
				x+=25;
			}
		
			
		}
		
	},
	loop:function(app){
		console.log("loop, blank")
	app.render(this.container);
		this.frameSprite.position.x += 60; 
		if(this.frameSprite.position.x>=1140)
			{
				this.go= new Button(this.app,'go','go','go') ;
				GameplayManager.get().setBlankWaiting(true);
				this.ticker.stop();
			}
				
		
	},
	loop2:function(app){
		console.log("loop2, blank")
	app.render(this.container);
	this.go.sprite.y=-375;
	this.frameSprite.position.x -= 70; 
	if(this.frameSprite.position.x<=-420)
		{
			this.ticker.stop();
			this.container.destroy();
		}
				
		
	},
	loopTiles:function(app){
		console.log("loopTiles, blank")
	app.render(this.container);
		for(var i=0;i<this.tiles.length;i++)
		{  
			this.tiles[i].container.position.y += 30; 
		}
	},
	loopTiles2:function(app){
	app.render(this.container);
		for(var i=0;i<this.tiles.length;i++)
		this.tiles[i].container.position.y -= 30; 
		
	},
	
	removeBorad:function(){
		let mng=GameplayManager.get();
		let x=-1;
		if(mng.selectedTile !=null)
			{
				x=(mng.selectedTile.container.position.x -369 ) /25;
				console.log(x,mng.selectedTile.container.children[2].text)
			}
		if( x>=0 && x<6)
		{
			///create a ticker
			this.ticker  =  new PIXI.ticker.Ticker();
			this.ticker.add((deltaTime) => {
				this.loop2(this.app);
			});
			this.ticker.start();
			this.ticker.add((deltaTime) => {
				this.loopTiles2(this.app);
			});
			mng.setBlankWaiting(false);
			//update the tile value
			mng.myBlank.container.children[2].text=mng.selectedTile.container.children[2].text;
			this.container.destroy();
			mng.blank=null;
		}	
	},
}