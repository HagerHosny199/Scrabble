console.log("board file loaded");

let Board = function (app) {
	this._path = 'assets/scrabble.png';
    this._sprite;
    this._visible = true;
    this._clickable = true;
    this._selectedTile = null;
    this._app = app; 

    this._animationStartingPos;
    this._animation_t1;
    this._animation_t2;
    this._hand;
    this._mouseclickPos; //el local mmkn y3ml mshakel hna
    this._randomDir; 
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
        this._sprite = PIXI.Sprite.fromImage(this._path);          
        app.stage.addChild(this._sprite);
        this._sprite.interactive = this._clickable;
        //this._sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs

        this._sprite.scale.set(0.6);
        this._sprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse

    },
    setHand: function(hand){
    	this._hand = hand;
    },
    myonClick: function(e){
    	e.data.local = {
    		x: e.data.global.x - this._sprite.position.x,
    		y: e.data.global.y - this._sprite.position.y
    	}
    	this._mouseclickPos = e.data.local;
    	if (this._selectedTile){
    		//logic of movement here ..
			this._animationFunction = this.moveHandtoTile.bind(this)
			this._app.ticker.add(this._animationFunction);
			this._animationStartingPos = {x:this._hand._container.position.x, y:this._hand._container.position.y};
    		this._animation_t1 = 0;
    		this._animation_t2 = 0;
    		this._randomDir = Math.random() >= 0.5;


    	}
    },
    selectTile: function(tile){
    	this._selectedTile = tile;
    	//should be able to unselect too
    },
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    moveHandtoTile: function(delta){
    	// terminating condition
    	if (this._animation_t1 > 60 && this._animation_t2 > 60) 
    		this._app.ticker.remove(this._animationFunction);

    	//to move towards a tile
    	if (this._animation_t1 < 60) {
    		this._hand._container.position.x = this._animationStartingPos.x + this.easeOutQuart(this._animation_t1/60) * (this._selectedTile._container.position.x - this._animationStartingPos.x);
    		this._hand._container.position.y = this._animationStartingPos.y + this.easeOutQuart(this._animation_t1/60) * (this._selectedTile._container.position.y - this._animationStartingPos.y);
    		this._animation_t1 = this._animation_t1 + delta;
    	}

    	//to move towards mouse click
    	if (this._animation_t1 > 50 && this._animation_t2 < 60){
    		this._hand._container.position.x = this._selectedTile._container.position.x + this.easeOutQuart(this._animation_t2/60) * (this._mouseclickPos.x - this._selectedTile._container.position.x);
    		this._hand._container.position.y = this._selectedTile._container.position.y + this.easeOutQuart(this._animation_t2/60) * (this._mouseclickPos.y - this._selectedTile._container.position.y);	
    		this._animation_t2 = this._animation_t2 + delta;
    	}

    	//todo: move hand out of window and move tile with it

    	if (this._randomDir)
    		this._hand._container.rotation += 0.004 * delta;
    	else
    		this._hand._container.rotation -= 0.004 * delta;
    }
};
