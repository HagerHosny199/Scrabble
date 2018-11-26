
let Menu = function (app,type) {
	this.path;
    this.sprite;
    this.visible = true;
    this.clickable = true;
	this.mouseClickPos;
	this.ticker;
    this.app = app; 
	this.button1=null;
	this.button2=null;
	this.button3=null;
	this.type=type;
	this.thankSprite;
	this.thankPath='assets/thanks_.png';
	Menu.instance=this;
    this.init(app);
}
Menu.get=function()
{
	return Menu.instance;
}
Menu.prototype = {
    init: function(app){
		if(this.type=='mode')
			this.path = 'assets/mode_.png';
		else if(this.type=='play')
			this.path = 'assets/play_.png';
		else 
			this.path = 'assets/first_.png';
        // create a new Sprite from an image path
        this.sprite = PIXI.Sprite.fromImage(this.path);          
        app.stage.addChild(this.sprite);
        this.sound = PIXI.sound.Sound.from('assets/start.mp3');
		
        
        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(0.6);
		this.setMenu();
		
		

    },
	setMenu:function()
	{
		this.sound.play();
		this.button1=null;
		this.button2=null;
		this.button3=null;
		if(this.type=='first')
		{
			this.button1=new Button(this.app,'human',1,'first');
			this.button2=new Button(this.app,'ai',2,'first');
		}
		else if(this.type=='mode')
		{
			this.button1=new Button(this.app,'trainer',1,'mode');
			this.button2=new Button(this.app,'ai',2,'mode');
		}
		else
		{
			this.button1=new Button(this.app,'play',1,'play');
			this.button2=new Button(this.app,'score',2,'play');
			this.button3=new Button(this.app,'quit',3,'play');
			
		}
		
	},
	updateMenu:function()
	{
		if(this.type=='first')
		{
			var texture=PIXI.Texture.fromImage("assets/first_.png"); 
			this.sprite.setTexture(texture);
			this.button1.update('human',1,'first');
			this.button2.update('ai',2,'first');
		}
		else if(this.type=='mode')
		{
			var texture=PIXI.Texture.fromImage("assets/mode_.png"); 
			this.sprite.setTexture(texture);
			this.button1.update('trainer',1,'mode');
			this.button2.update('ai',2,'mode');
			this.button3.update();
			
		}
		else if(this.type=='end')
		{
			//var texture=PIXI.Texture.fromImage("assets/bk.jpg"); 
			//this.sprite.setTexture(texture);
			this.button1.update();
			this.button2.update();
			this.button3.update();
			// create a new Sprite from an image path
			this.thankSprite = PIXI.Sprite.fromImage(this.thankPath);   
			this.thankSprite.scale.set(0.6);
			this.thankSprite.position.set(300,555);
			this.app.stage.addChild(this.thankSprite);
			///create a ticker
			this.ticker  =  new PIXI.ticker.Ticker();
			this.ticker.add((deltaTime) => {
				this.loop(this.app);
			});
			this.ticker.start();
			this.sound.play();
		}
		else
		{
			
			
		}
	},
	loop:function(app){
		app.render(this.container);
		this.thankSprite.position.y -= 8; 
		if(this.thankSprite.position.y<200)
		{
			this.ticker.stop();
			this.thankSprite.position.set(300,200);
			//this.container.parent.removeChild(this.container);
		}
	},
   changeMenu:function(type)
   {
	   this.type=type;
	   console.log("now type=",this.type);
	   this.updateMenu();
   }
};
