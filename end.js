let End = function () 
{
	this.thankPath='assets/thanks_.png'
	this.thankSprite=null
	this.sound =null
	this.sprite=null
	this.path='assets/play_.png'
	this.app= Graphics.get().app;
	this.init()
}
End.prototype = {
	init: function(){   
		// create a new Sprite from an image path
        this.sprite = PIXI.Sprite.fromImage(this.path);          
        this.app.stage.addChild(this.sprite);    
		this.sprite.scale.set(0.6);
        this.sound = PIXI.sound.Sound.from('assets/start.mp3');
		// create a new Sprite from an image path
		this.thankSprite = PIXI.Sprite.fromImage(this.thankPath);   
		this.thankSprite.scale.set(0.6);
		this.thankSprite.position.set(300,555);
		this.app.stage.addChild(this.thankSprite);
		console.log(this.thankSprite)
		///create a ticker
		this.ticker  =  new PIXI.ticker.Ticker();
		this.ticker.add((deltaTime) => {
			this.loop(this.app);
		});
		this.ticker.start();
		this.sound.play();
		

    },
	loop:function(app){
		app.render(this.container);
		this.thankSprite.position.y -= 8; 
		if(this.thankSprite.position.y<200)
		{
			this.ticker.stop();
			this.thankSprite.position.set(300,200);
		}
	}
}