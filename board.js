console.log("board file loaded");

let Board = function (app) {
	this.path = 'assets/scrabble.png';
    this.sprite;
    this.visible = true;
    this.clickable = true;
    this.selectedTile = null;
    this.app = app; 

    this.animationStartingPos;
    this.animationT1;
    this.animationT2;
    this.animationT3;
    this.hand;
    this.mouseClickPos; //el local mmkn y3ml mshakel hna
    this.randomDir; 
    this.moving = false;
    this.tileSound = null;
    // todo: 
    // - el text score
    // - el asma2
    // - el dwayer l bttla3 on hover
    // - array 2D 3ashan te3raf min free we min la2 (fl a5er 5ales di)
    

    this.init(app);
}

Board.prototype = {
    init: function(app){
        // create a new Sprite from an image path
        this.sprite = PIXI.Sprite.fromImage(this.path);          
        app.stage.addChild(this.sprite);
        this.sprite.interactive = this.clickable;
        this.tileSound = PIXI.sound.Sound.from('assets/tile-sound-effect.wav');

        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(0.6);
        this.sprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
		

    },
    setHand: function(hand){
    	this.hand = hand;
    },
    myonClick: function(e){
    	e.data.local = {
    		x: e.data.global.x - this.sprite.position.x,
    		y: e.data.global.y - this.sprite.position.y
    	}
    	this.mouseClickPos = e.data.local;
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
    },
    selectTile: function(tile){
    	this.selectedTile = tile;
    	//should be able to unselect too
    },
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    moveHandtoTile: function(delta){
    	// terminating condition
    	if (this.animationT1 > 60 && this.animationT2 > 60 && this.animationT3 > 60) {
    		this.app.ticker.remove(this._animationFunction);
            this.moving = false;
        }

    	//to move towards a tile
    	if (this.animationT1 < 60) {
    		this.hand.container.position.x = this.animationStartingPos.x + this.easeOutQuart(this.animationT1/60) * (this.selectedTile.animationStartingPos.x - this.animationStartingPos.x);
    		this.hand.container.position.y = this.animationStartingPos.y + this.easeOutQuart(this.animationT1/60) * (this.selectedTile.animationStartingPos.y - this.animationStartingPos.y);
    		this.animationT1 = this.animationT1 + delta;
    	}

    	//to move towards mouse click
    	if (this.animationT1 > 50 && this.animationT2 < 60){
    		this.hand.container.position.x = this.selectedTile.animationStartingPos.x + this.easeOutQuart(this.animationT2/60) * (this.mouseClickPos.x - this.selectedTile.animationStartingPos.x);
    		this.hand.container.position.y = this.selectedTile.animationStartingPos.y + this.easeOutQuart(this.animationT2/60) * (this.mouseClickPos.y - this.selectedTile.animationStartingPos.y);	
    		this.selectedTile.container.position.x = this.hand.container.position.x;
            this.selectedTile.container.position.y = this.hand.container.position.y;
            this.animationT2 = this.animationT2 + delta;
    	}

        //to move hand out of game
        if (this.animationT2 > 50 && this.animationT3 < 60){
            //this.tileSound.play();
            this.hand.container.position.x = this.mouseClickPos.x + this.easeOutQuart(this.animationT3/60) * (this.app.screen.width / 2 + 30 - this.mouseClickPos.x);
            this.hand.container.position.y = this.mouseClickPos.y + this.easeOutQuart(this.animationT3/60) * (this.app.screen.height + 120 - this.mouseClickPos.y); 
            this.animationT3 = this.animationT3 + delta;
        }

    	//if (this.randomDir)
    	//	this.hand.container.rotation += 0.004 * delta;
    	//else
    	//	this.hand.container.rotation -= 0.004 * delta;
    }
};
