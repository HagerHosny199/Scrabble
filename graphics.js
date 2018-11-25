
let Graphics = function() {

	if (typeof Graphics.instance != 'undefined'){
        console.log("Graphics PIXI already initialized before")
        return Graphics.instance;
    }

	//initializing PIXI
	console.log("Initializing graphics PIXI object")
    this.app = new PIXI.Application(1355, 690, {backgroundColor : 0x16D6EB, antialias: true, forceFXAA: true});
    
    //document.body.appendChild(this.app.view);
    document.getElementById('container').appendChild(this.app.view);
    
    //PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation, da 7lw lel pixel art bs bye3ml alias fl sewar el 3adia
    PIXI.settings.RENDER_OPTIONS.antialias = true;

    //Make outer <div> to position: relative and inner <div> to position: absolute. It should work for you.
    this.app.renderer.view.style.position = 'absolute'
    this.app.renderer.view.style.left = '-120px';
    this.app.renderer.view.style.top = '-40px';

    function myFunction(x) {
        if (x.matches) { // If media query matches
            // scale the canvas object to make the height fit into the screen height exactly
            // and center it 
            let canvas = document.getElementsByTagName('canvas')[0] 
            //console.log(canvas.clientHeight)
            //console.log(window.innerHeight)
            let o = "translate(" + (-window.innerHeight/2) + "px," + (-canvas.clientHeight/2) + "px)" +  " scale(" + window.innerHeight/canvas.clientHeight + ")" ;
            //console.log(o)
            canvas.style.transform = o;
            
        } 
    }
    var x = window.matchMedia("(max-width: 1024px ) and (orientation:landscape)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes

    //this.app.renderer.view.style.display = 'block'
    //this.app.renderer.autoResize = true
    //this.app.renderer.resize(window.innerWidth-20, window.innerHeight-20);
    
    Graphics.instance = this;
    Graphics.get = function(){
        return Graphics.instance;
    }

}
