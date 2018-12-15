
let Hand = function () {
	this.handPath = 'assets/hand-locked.png';
    this.shadowPath = 'assets/hand-locked-shadow.png';
    this.handSprite;
    this.shadowSprite;
    this.container;
    this.visible = true;
    this.app = Graphics.get().app;
        
    this.init();
}

Hand.prototype = {
    init: function(){
        //Create container and assign it for rendering
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        // create a new Sprite from an image path
        this.handSprite = PIXI.Sprite.fromImage(this.handPath);          
        this.shadowSprite = PIXI.Sprite.fromImage(this.shadowPath);
        
        this.shadowSprite.x = -40; this.shadowSprite.y = 25;
        this.container.addChild(this.shadowSprite);
        this.container.addChild(this.handSprite);
        this.container.pivot.x = 30;
        this.container.pivot.y = 175;
        this.container.x = this.app.screen.width / 2 + 30;
        this.container.y = this.app.screen.height + 120;   
        this.container.scale.set(0.6);
        this.container.rotation = -0.25

    },
    refreshZ: function(){
        this.app.stage.removeChild(this.container);
        this.app.stage.addChild(this.container);        
    }
};
