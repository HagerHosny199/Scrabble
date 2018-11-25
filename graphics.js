
let Graphics = function() {

	if (typeof Graphics.instance != 'undefined'){
        console.log("Graphics PIXI already initialized before")
        return Graphics.instance;
    }

	//initializing PIXI
	console.log("Initializing graphics PIXI object")
    this.app = new PIXI.Application(1355, 635, {backgroundColor : 0x16D6EB, antialias: true, forceFXAA: true});
    document.body.appendChild(this.app.view);
    //PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation, da 7lw lel pixel art bs bye3ml alias fl sewar el 3adia
    PIXI.settings.RENDER_OPTIONS.antialias = true;

    Graphics.instance = this;
    Graphics.get = function(){
        return Graphics.instance;
    }

}
