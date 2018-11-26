
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
        this.sound = PIXI.sound.Sound.from('assets/button.mp3');
		//this.sound.play();
        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(0.38);
        this.sprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
		this.setButton();
		

    },
	setButton:function()
	{
		var texture=PIXI.Texture.fromImage("assets/"+this.name+".png"); 
		this.sprite.setTexture(texture);
		if(this.mode==null)
		{
			this.sprite.x=-400;
			this.sprite.y=-220;
		}
		else if (this.mode=='play')
		{
			if(this.pos==1)
			{
				this.sprite.x=400;
				this.sprite.y=220;
			}
			else if (this.pos==2)
			{
				this.sprite.x=480;
				this.sprite.y=340;
			}
			else
			{
				this.sprite.x=480;
				this.sprite.y=420;
			}
			
		}
		else if(this.mode=='board')
		{
			this.sprite.scale.set(0.6);
			if(this.pos==1)
			{
				this.sprite.x=750;
				this.sprite.y=455;
			}
			else if (this.pos==2)
			{
				this.sprite.x=750;
				this.sprite.y=500;
			}
			else
			{
				this.sprite.x=750;
				this.sprite.y=545;
			}
			
		}
		
		else 
		{
			if(this.pos==1)
			{
				this.sprite.x=400;
				this.sprite.y=290;
			}
			else
			{
				this.sprite.x=400;
				this.sprite.y=420;
			}
		}
	},
    myonClick: function(e){
    	e.data.local = {
    		x: e.data.global.x - this.sprite.position.x,
    		y: e.data.global.y - this.sprite.position.y
    	}
		this.sound.play();
    	this.mouseClickPos = e.data.local;
		console.log(this.mouseClickPos);
		//action of coosing the first player
    	if(this.mode=='first')
		{
			if(this.name=='human')
			{
				console.log("first:human");
				GameplayManager.get().initBoard();
			}
			else if (this.name=='ai')
				{
				console.log("first:AI");
				GameplayManager.get().initBoard();
			}
		}
		else if(this.mode=='play')
		{
			if(this.name=='play')
			{
				console.log("play pressed");
				Menu.get().changeMenu("mode");
			}
			else if (this.name=='score')
				console.log("score pressed");
			else if (this.name=='quit')
			{
				console.log("quit pressed");
				Menu.get().changeMenu("end");
			}
		}
		else if(this.mode=='mode')
		{
			if(this.name=='trainer')
			{
				console.log("mode:trainer");
				Menu.get().changeMenu("first");
			}
			else if (this.name=='ai')
			{
				console.log("mode:AI");
				GameplayManager.get().initBoard();
			}
			
		}
		else if (this.mode=="board")
		{
			console.log("boaaaard",this.name);
			// calculate (row, col)
            let col = (this.mouseClickPos.x - 225) / ((670 - 225)/15);
            let row = (this.mouseClickPos.y - 100) / ((575 - 100)/15);
            GameplayManager.get().boardClick(Math.floor(row), Math.floor(col),this.name);
       
		}
    },
	update:function(name,pos,mode)
	{ 
		this.name=name;
		this.mode=mode;
		this.pos=pos;
		this.setButton();
	}
    
};
