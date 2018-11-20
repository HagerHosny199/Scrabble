
let Board = function () {
	this.path = 'assets/scrabble.png';
    this.sprite;
    this.visible = true;
    this.clickable = true;
    this.selectedTile = null;
    this.app = Graphics.get().app; 

    // todo: 
    // - el text score
    // - el asma2
    // - array 2D 3ashan te3raf min free we min la2 (fl a5er 5ales di) [mftkrsh m7tagha 3ashan l tile mghtya l moraba3 asln msh h3rf adoso]
    
    this.init();
}

Board.prototype = {
    init: function(){
        // create a new Sprite from an image path
        this.sprite = PIXI.Sprite.fromImage(this.path);          
        this.app.stage.addChild(this.sprite);
        this.sprite.interactive = this.clickable;

        //this.sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100); //3ashan ados 3l le3ba bs
		this.sprite.scale.set(0.6);
        this.sprite.on('pointerdown', this.myonClick.bind(this)); // Pointers normalize touch and mouse
		

    },
    
    myonClick: function(e){
    	e.data.local = {
            x: e.data.global.x - this.sprite.position.x,
            y: e.data.global.y - this.sprite.position.y
        }
        let x = e.data.local.x; let y = e.data.local.y;
        // these numbers needs a better way to be calculated
        // (225, 100) ---------------------- (670, 100)
        //     |                                  |
        //     |                                  |
        //     |                                  |
        //     |                                  |
        //     |                                  |
        //     |                                  |
        //     |                                  |
        // (225, 575) ----------------------- (670, 575)

        if ( x < 225 || x > 670 || y < 100 || y > 575)
            console.log("Click out of board bounds");
        else {
            // calculate (row, col)
            let col = (x - 225) / ((670 - 225)/15);
            let row = (y - 100) / ((575 - 100)/15);
            //console.log("click on row:" + Math.floor(row) + ", col: " + Math.floor(col));
            GameplayManager.get().boardClick(Math.floor(row), Math.floor(col));
        }

    }
};
