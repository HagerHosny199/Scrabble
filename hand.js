console.log("hand file loaded");

let Hand = function (app) {
	this._handpath = 'assets/hand-locked.png';
    this._shadowpath = 'assets/hand-locked-shadow.png';
    this._handsprite;
    this._shadowsprite;
    this._container;
    this._visible = true;
        
    this.init(app);
}

Hand.prototype = {
    init: function(app){
        //Create container and assign it for rendering
        this._container = new PIXI.Container();
        app.stage.addChild(this._container);

        // create a new Sprite from an image path
        this._handsprite = PIXI.Sprite.fromImage(this._handpath);          
        this._shadowsprite = PIXI.Sprite.fromImage(this._shadowpath);
        
        this._shadowsprite.x = -40; this._shadowsprite.y = 25;
        this._container.addChild(this._shadowsprite);
        this._container.addChild(this._handsprite);
        this._container.pivot.x = 30;
        this._container.pivot.y = 190;
        this._container.x = app.screen.width / 2;
        this._container.y = app.screen.height / 2 + 10;   
        this._container.scale.set(0.6);
        this._container.rotation = -0.25

    }
};
