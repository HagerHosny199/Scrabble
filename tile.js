console.log("tile file loaded");

let Tile = function (app) {
	this._tilepath = 'assets/blank-tile.png';
    this._shadowpath = 'assets/blank-tile-shadow.png';
    this._tilesprite;
    this._shadowsprite;
    this._text;
    this._container;
    this._clickable = true; //true on my turn only
    this._visible = true;
    this._app = app;
        
    this._dummy = true;
    this.init(app);
}

Tile.prototype = {
    init: function(app){
        //Create container and assign it for rendering
        this._container = new PIXI.Container();
        app.stage.addChild(this._container);

        // create a new Sprite from an image path
        this._tilesprite = PIXI.Sprite.fromImage(this._tilepath);          
        this._shadowsprite = PIXI.Sprite.fromImage(this._shadowpath);
        let style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 28, dropShadow: true, dropShadowColor: '#000000',
            dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
        this._text = new PIXI.Text('A', style);
        this._shadowsprite.x = -7; this._shadowsprite.y = -3;
        this._text.x = 12; this._text.y = 6;
        this._tilesprite.interactive = this._clickable;
        this._tilesprite.buttonMode = this._clickable;
        this._container.addChild(this._shadowsprite);
        this._container.addChild(this._tilesprite);
        this._container.addChild(this._text);
        this._container.pivot.x = 22;
        this._container.pivot.y = 22;
        this._container.x = app.screen.width / 2;
        this._container.y = app.screen.height / 2;   
        this._container.scale.set(0.7);
        // important note: el event el byndah el onclick kan hwa el 'this' fa 3amlt mwdo3 bind da
        // bind(this) bet return function gdida wel this bta3etha hya el 7aga el ana ba3ethalha! wow
        this._tilesprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
    },

    //ba3d kda msh hynfa3 yb2a el tile l hya el fiha el hy7sal fl onclick , mfrod yb2a fi 7ad kbir shayef
    //we y2olha lama hya bs t2ol 7ad dasni , 3ashan hyb2a fi relations ben el tiles wel hand , we kolo mstani ba3d
    // msh kol wa7ed bytsaraf lwa7do 
    myonClick: function(){
        //console.log(this)
        this._container.rotation += 0.05;

        if (this._dummy){
            this._dodo = this.dummFunc.bind(this) //da lazmto eni b7awesh pointer 3l function el gdida el rag3ali mn el bind 3ashan lma a2ol remove y3rf hyshil min
            // we da kolo asln 3ashan lma ba3at el function mn gher bind, el this etghyaret
            this._app.ticker.add(this._dodo);
        }
        else{
            this._app.ticker.remove(this._dodo);
        }
        this._dummy = !this._dummy;
    },

    dummFunc: function(delta){
        this._container.rotation += 0.03 * delta;
    }
};
