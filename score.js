let Score = function(app){
	this.app=app;
	this.scoreSprite;
	this.scorePath='assets/score2.png';
	this.init(app);
	this.ticker;
	this.sound;
	this.score1;
	this.score2;
	this.name1;
	this.name2;
	Score.instance=this;
}
Score.get=function()
{
	return Score.instance;
}
Score.prototype={
	init: function(app)
	{
		//create container
		this.container = new PIXI.Container();
		//assign the container for the global one for rendering
		this.app.stage.addChild(this.container);
		
		//create the sound effect 
		this.sound = PIXI.sound.Sound.from('assets/TaDa.mp3');
		
		// create a new Sprite from an image path
        this.scoreSprite = PIXI.Sprite.fromImage(this.scorePath);   
		this.scoreSprite.scale.set(0.2);
		this.scoreSprite.position.set(697,100);
		this.container.addChild(this.scoreSprite);
		//create text style
		let style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 28, dropShadow: true, dropShadowColor: '#000000',
			dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		let textStyle = new PIXI.TextStyle({ fill:'#ffa952',fontFamily: 'Arial', fontSize: 28, dropShadow: true, dropShadowColor: '#ffffff',
			dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		this.score1 = new PIXI.Text('0', style);
		this.score2 = new PIXI.Text('0', style);
		this.score1.position.set(735,187);
		this.score2.position.set(815,187);
		this.name1 = new PIXI.Text('YOU', textStyle);
		this.name2 = new PIXI.Text('AI', textStyle);
		this.name1.position.set(720,100);
		this.name2.position.set(820,100);
		
		this.container.addChild(this.score1);
		this.container.addChild(this.score2);
		this.container.addChild(this.name1);
		this.container.addChild(this.name2);
		
		
	},
	
	
};