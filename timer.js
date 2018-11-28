let Timer = function(app){
	this.app=app;
	this.init(app);
	this.ticker;
	this.sound;
	this.time1;
	this.time2;
}

Timer.prototype={
	init: function(app)
	{
		//create container
		this.container = new PIXI.Container();
		//assign the container for the global one for rendering
		this.app.stage.addChild(this.container);
		
		//create the sound effect 
		this.sound = PIXI.sound.Sound.from('assets/TaDa.mp3');
		
		//create text style
		let textStyle = new PIXI.TextStyle({ fill:'#ffffff',fontFamily: 'Arial', fontSize: 28, dropShadow: true, dropShadowColor: '#ffffff',
			dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		this.time1 = new PIXI.Text('00:00', textStyle);
		this.time2 = new PIXI.Text('00:01', textStyle);
		this.time1.position.set(705,300);
		this.time2.position.set(805,300);
		
		this.container.addChild(this.time1);
		this.container.addChild(this.time2);
		
		
	},
	
	
};