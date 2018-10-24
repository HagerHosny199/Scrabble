let Reward = function(app){
	this.app=app;
	this.rewardSprite;
	this.rewardPath='assets/congrate.png';
	this.init(app);
	this.ticker;
	this.sound;
}

Reward.prototype={
	init: function(app)
	{
		//create container
		this.container = new PIXI.Container();
		//assign the container for the global one for rendering
		app.stage.addChild(this.container);
		
		//create the sound effect 
		this.sound = PIXI.sound.Sound.from('assets/TaDa.mp3');
		
		// create a new Sprite from an image path
        this.rewardSprite = PIXI.Sprite.fromImage(this.rewardPath);   
		this.rewardSprite.scale.set(0.5);
		this.rewardSprite.position.set(150,555);
		app.stage.addChild(this.rewardSprite);
		
		///create a ticker
		this.ticker  =  new PIXI.ticker.Ticker();
		this.ticker.add((deltaTime) => {
			this.loop(app);
		});
		this.ticker.start();
		this.sound.play();
	},
	loop:function(app){
		app.render(this.container);
		this.rewardSprite.position.y -= 8; 
		if(this.rewardSprite.position.y<-400)
		{
			this.ticker.stop();
			this.rewardSprite.position.set(1500,1500);
			//this.container.parent.removeChild(this.container);
		}
	}
	
};