
let Menu = function (app) {
	this.path = 'assets/mode.jpg';
    this.sprite;
    this.visible = true;
    this.clickable = true;
	this.mouseClickPos;
    this.app = app; 


    this.init(app);
}

Menu.prototype = {
    init: function(app){
        // create a new Sprite from an image path
        this.sprite = PIXI.Sprite.fromImage(this.path);          
        app.stage.addChild(this.sprite);
        this.sprite.interactive = this.clickable;
        this.sound = PIXI.sound.Sound.from('assets/tile-sound-effect.mp3');
		this.sound.play();
        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(0.53);
        this.sprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
		

    },
    myonClick: function(e){
    	e.data.local = {
    		x: e.data.global.x - this.sprite.position.x,
    		y: e.data.global.y - this.sprite.position.y
    	}
    	this.mouseClickPos = e.data.local;
		console.log(this.mouseClickPos);
    	if (this.selectedTile && !this.moving){
    		//logic of movement here ..
			this._animationFunction = this.moveHandtoTile.bind(this)
			this.app.ticker.add(this._animationFunction);
			this.animationStartingPos = {x:this.hand.container.position.x, y:this.hand.container.position.y};
            this.selectedTile.animationStartingPos = {x:this.selectedTile.container.position.x, y:this.selectedTile.container.position.y};
    		this.animationT1 = 0;
    		this.animationT2 = 0;
            this.animationT3 = 0;
            console.log(this.selectedTile.animationStartingPos)
    		this.randomDir = Math.random() >= 0.5;
            this.moving = true;
    	}
    }
    
};
