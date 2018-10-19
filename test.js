
window.onload = function(){ 

    //initializing PIXI
    let app = new PIXI.Application(800, 600, {backgroundColor : 0x16D6EB, antialias: true, forceFXAA: true});
    document.body.appendChild(app.view);
    //PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation, da 7lw lel pixel art bs bye3ml alias fl sewar el 3adia
    PIXI.settings.RENDER_OPTIONS.antialias = true;
    let tile1 = new Tile(app);
    let tile2 = new Tile(app);
    let tile3 = new Tile(app);
 
    tile2._container.position.set(100,200)
    tile3._container.position.set(300,323)
    tile2._container.children[2].text='B'



    let hand = new Hand(app);
    app.ticker.add(function(delta) {
        hand._container.rotation = 0.002 * delta * window.mouseX - 1;
    });


    //TODO:
    // - shil l ai klam el ta7t da
    // - e3ml mwdo3 el animation bta3 el eid enha tigi 3l tile lma ados 3leha , we lma ados 7eta tania twadiha fiha we temshi 
    // - e3ml l board wel dwayer el bttla3 3l squares lama a hover 3leha
    // - e3ml 2D array bl amaken el fadya wel msh fadya 3ashan mytla3sh dwayer fl msh fadya
    // - e3ml frames tania le shakl l eid 3ashan tb2a laziza aktr

    // code ai klam gebto we hashilo 3ashan ygib l mouse position bsor3a bas 
    window.mouseX = 0;
    (function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        window.mouseX =  event.pageX;
    }
    })();
    
    /*// Listen for animate update
    app.ticker.add(function(delta) {
        tile1._container.rotation += 0.03 * delta;
    }); 


    function toto (delta){
        console.log("add")
        tile1._container.pivot.x += 0.3 * delta ;
    }
    app.ticker.add(toto);
    setTimeout(function(){ app.ticker.remove(toto); console.log("remove") }, 10000);
*/

    //////////////////////

    //Uncommment those to make Pixi fill the screen
    //app.renderer.view.style.position = "absolute";
    //app.renderer.view.style.display = "block";
    //app.renderer.autoResize = true;
    //app.renderer.resize(window.innerWidth-20, window.innerHeight-20);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}