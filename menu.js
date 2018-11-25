
let Menu = function (app,type) {
	this.path;
    this.sprite;
    this.visible = true;
    this.clickable = true;
	this.mouseClickPos;
    this.app = app; 
	this.button1=null;
	this.button2=null;
	this.button3=null;
	this.type=type;

    this.init(app);
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
        this.sound = PIXI.sound.Sound.from('assets/tile-sound-effect.mp3');
		this.sound.play();
        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(1);
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
   
};
