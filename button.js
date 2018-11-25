
let Button = function (app,name,pos,mode) {
	this.path = 'assets/'+name+'.png';
    this.sprite;
    this.visible = true;
    this.clickable = true;
	this.mouseClickPos;
    this.app = app; 
	this.name=name;
	this.pos=pos;
	this.mode=mode; //mmkn yb2a play/mode/first/board 
    this.init(app);
}

Button.prototype = {
    init: function(app){
        // create a new Sprite from an image path
        this.sprite = PIXI.Sprite.fromImage(this.path);          
        app.stage.addChild(this.sprite);
        this.sprite.interactive = this.clickable;
        this.sound = PIXI.sound.Sound.from('assets/tile-sound-effect.mp3');
		this.sound.play();
        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(0.5);
        this.sprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
		if (this.mode=='play')
		{
			if(this.pos==1)
			{
				this.sprite.x=455;
				this.sprite.y=200;
			}
			else if (this.pos==2)
			{
				this.sprite.x=555;
				this.sprite.y=350;
			}
			else
			{
				this.sprite.x=555;
				this.sprite.y=450;
			}
			
		}
		else
		{
			if(this.pos==1)
			{
				this.sprite.x=500;
				this.sprite.y=260;
			}
			else
			{
				this.sprite.x=500;
				this.sprite.y=410;
			}
		}

    },
    myonClick: function(e){
    	e.data.local = {
    		x: e.data.global.x - this.sprite.position.x,
    		y: e.data.global.y - this.sprite.position.y
    	}
    	this.mouseClickPos = e.data.local;
		console.log(this.mouseClickPos);
		//action of coosing the first player
    	if(this.mode=='first')
		{
			if(this.name=='human')
				console.log("first:human");
			else if (this.name=='ai')
				console.log("first:AI");
		}
		else if(this.mode=='play')
		{
			if(this.name=='play')
				console.log("play pressed");
			else if (this.name=='score')
				console.log("score pressed");
			else if (this.name=='quit')
				console.log("quit pressed");
		}
		else if(this.mode=='mode')
		{
			if(this.name=='trainer')
				console.log("mode:trainer");
			else if (this.name=='ai')
				console.log("mode:AI");
		}
    }
    
};
