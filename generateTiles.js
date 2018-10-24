let GenerateTiles= function(app){
	this.app=app;
	this.container;
	this.bag;
	this.tiles=[];
	this.chars=[];
	this.bagValues=[];
	this.values=[];
	this.availableTiles=[];
	this.framePath = 'assets/frame.png';
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
		this.frameSprite.position.set(490,280);
		this.container.scale.set(0.5); 
		this.container.addChild(this.frameSprite);
		
		//create array of the available tiles in the global bag
		this.bag=new Bag();
		this.availableTiles=this.bag.getBag();
		//get the map of the chars
		this.chars=this.bag.getChar();
		//get the value of each tile 
		this.bagValues=this.bag.getValues();
		
		//load the tiles to be rendered 
		this.loadTiles();
		
	},
	
	loadTiles:function()
	{
		var j=0;
		//create array of the tiles 
		for(var i=0;i<27;i++)
		{
			if(availableTiles[i]>0)
			{
				this.tiles[j]=this.availableTiles[i];
				this.values[j]=this.bagValues[i];
				j++;
			}
		}
	}
	
	
};