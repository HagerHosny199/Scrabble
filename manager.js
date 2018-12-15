
let GameplayManager = function(){

	if (typeof GameplayManager.instance != 'undefined'){
	    console.log("GameplayManager already initialized before")
	    return GameplayManager.instance;
	}

	console.log("Initializing GameplayManager object")

	this.turn = true; //my turn is true
	this.waiting=false;
	this.selectedTile = null;
	this.movements = [];
	this.hands = [null,null];
	this.app = Graphics.get().app;
	this.grid = [];
	this.lastPlayed = [];
	//this variables used in the animation module
	this.animationStartingPos;
    this.animationT1;
    this.animationT2;
    this.animationT3;
    this.randomDir; 
    this.moving = false;
    this.tileSound = null;
	//to generate the tiles of each user
	this.bag=new Bag();
	this.user1;
	this.user2;
	this.userTiles=null;
	//shift logic
	this.selctedNum;
	this.availableTiles=7;
	this.tileAppend=7;
	this.chracter;
	//exchange logic
	this.exchange=false;
	this.exchangedTiles=[];
	this.used=[0,0,0,0,0,0,0];
	this.gen=null;
	this.menu=null;
	this.board=null;
    GameplayManager.instance = this;
    this.network=null;

    this.init();
    setInterval(this.showTurn, 700);
    setInterval(function(){ 
    if (GameplayManager.get().turn)
    	GameplayManager.get().board.updateTime(1,GameplayManager.get().board.user1Time-1000)
    else 
    	GameplayManager.get().board.updateTime(2,GameplayManager.get().board.user2Time-1000)
    GameplayManager.get().board.updateGameTime(GameplayManager.get().board.gameTime-1000)
    }
    , 1000);

}
//to get an instance from the manager
GameplayManager.get = function(){
    return GameplayManager.instance;
}

GameplayManager.prototype = {
    init: function(){
    	//init the empty grid with 0
    	for (let row = 0; row < 15; row++){
    		this.grid.push([]);
    		for (let col = 0; col < 15; col++)
    			this.grid[row].push(".");
    	}
    	this.network=new Network();
    },
	initBoard:function(initGrid)
	{
		//create board instance
		this.board=new Board();
		//create the 2 hand logic
		this.hands[0] = new Hand();
    	this.hands[1] = new Hand();
    	//updating their start positions
    	this.hands[1].container.x = this.app.screen.width / 2 + 30;
        this.hands[1].container.y = -120;
        this.hands[1].container.rotation = 3.25;
		//reinitialization logic of the grid 
		if(initGrid!=null)
		{
			for(var row=0;row<15;row++)
				for(var col=0;col<15;col++)
				{
					//if it's filled
					if(initGrid[15*row+col]!=0)
					{
						//create new tile 
						let tile=new Tile()
						//update the position	        
	           			let x=((670 - 225)/15) * col + 225 + ((670 - 225)/15)/2;
	           			let y=((575 - 100)/15) * row + 100 + ((575 - 100)/15) / 2;
						tile.container.position.set(x,y);
						//set the char
						tile.container.children[2].text=initGrid[15*row+col];
						tile.container.children[2].text=String.fromCharCode('A'.charCodeAt()+tile.container.children[2].text-1);
						//set the char value
						tile.container.children[3].text='3'; //this value should be changed 
						//mark it as used
						tile.setUsed();
						//update the grid array
						this.grid[row][col]='X';
					}
				}
			console.log(this.grid)
		}

		let container = new PIXI.Container();
		Graphics.get().app.stage.addChild(container);
    	let style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 32, fill: '#FFFFFF', dropShadow: false, dropShadowColor: '#000000', dropShadowBlur: 4, dropShadowAngle: Math.PI / 6, dropShadowDistance: 0 });
		this.turnText = new PIXI.Text('Your turn', style);
        this.turnText.x =720;
		this.turnText.y = 360;
        container.addChild(this.turnText);
        this.turnText.containerPointer = container;

	},

    // called from the tile onClick function
    tileClick: function(tile){
		//check exchange condition
		if(this.exchange == true) 
		{
			//getting not used tiles
			var genTiles=this.gen.getTiles();
			//highlight the tile only
			tile=tile.addShadow();
			//to handle the check and uncheck case
			for(var i =0;i<7;i++)
			{
				if(genTiles[i].getSelected()==true)
					this.exchangedTiles[i]=1;
				else
					this.exchangedTiles[i]=0;
			}
		}
    	else if (this.turn == true && this.waiting==false)
		{
			if (tile.getUsed() && !this.lastPlayed.includes(tile) )
				return;
    		//new 
    		if (this.movements.length == 0)
    			this.movements.push({
    				'selectedTile': tile,
    				'row': null,
    				'col': null
    			});
    		else if (this.movements[0].row == null) //lw awel movement fl list lsa ma5adtsh l desired location , y3ni dost 3la tile we b3dha tile tani
    			this.movements[0].selectedTile = tile;
    		else if (this.movements[this.movements.length-1].row == null)
    			this.movements[this.movements.length-1].selectedTile = tile;
    		else //lw el case en fi wa7da bttle3eb b2a dlwa2ty wana 3aiz a7ot wa7da tania fl movements
    			this.movements.push({
    				'selectedTile': tile,
    				'row': null,
    				'col': null
    			});
				//TODO call a function in Tile class to set the sprite to Glow effect (selected)
    	}
    },


    selectTile: function (tile_char){ 
    	let t = new Tile();
		t.container.position.set(500,-100);
		t.container.children[2].text=tile_char;
		t.container.children[3].text='3';  //this line should be changed
		t.turn = true;
		t.setUsed();
		this.movements.push({ 'selectedTile': t, 'row': null, 'col': null });	
    },

    getmovingornot: function(){return this.moving},

    boardClick: function(row,col,action){
    	// NOTE: the network/communication module can call this function after setting the selected tile
    	// with the desired (row, col) position to simulate the mouse click on game board
    	if(action=='shuffle'&& this.turn==true && this.waiting==false)
			//shuffle condition 
			this.userTiles=this.bag.shuffle(this.userTiles);
		else if(action=='exchange'&& this.turn==true && !this.lastPlayed.length && this.waiting==false)
		{
			if(this.moving==false && this.exchange==false )//exchange condition
				this.gen=new GenerateTiles(this.app,this.board,this.userTiles);
		}
		
		else if ( action=='ok' && this.turn==true && this.waiting==false)
		{
			//OK cond 
			if (this.moving==false )
			{
				let row=0
				let col=0
				let dir=0
				let tiles=[]
				// first check if the tiles are arranged in a correct format
				// if not, return 
				if (!this.checkValidity())
					return;

				//now this is not my turn 
				//this.turn = !this.turn; 
				this.waiting=true;
				//send last play to the server TODO
				[row,col,dir,tiles]=this.playInfo()
				this.network.sendPlay(row,col,dir,tiles);
				//check if the available tiles less than 7 
				if(this.availableTiles<7)
				{
					//complete the tiles to have 7
					//this line should be changed based on the handler
					// [this.tileAppend,this.availableTiles,this.userTiles]=this.bag.completeTiles(this.userTiles,this.availableTiles,this.tileAppend);
				}
			}

			// mthya2li mfrod di t5osh gowa el if el fo2
			this.movements = [];
			//else ignore the press

		}
		else if (action=='pass' && this.turn==true  && !this.lastPlayed.length && this.waiting==false)
		{
			this.network.sendPass();
		}
		else if (row>14 || col>14) return;
		//check if exchange and go 
		else if (this.exchange==true && row>=8 && row <=9 && col>=8 && col <=9  && !this.lastPlayed.length)
		{
			//remove the board 
			GenerateTiles.get().removeBorad();
			//toggle exchange
			this.setExchange();
			//exchange the tiles -> send request to the network
			this.network.sendExchange(this.userTiles,this.exchangedTiles)
			//this.userTiles=this.bag.exchange(this.userTiles,this.exchangedTiles);
			this.turn = false;
			
			
		} 
    	else if (action == null && ! this.isEmpty(row, col))
    		return;
    	else if (action == null && this.movements.length){

    		if (this.selectedTile)
    			if (this.selectedTile.turn)
    				return;
    		//el click l gdida mlhash => y3ni doosa gdida we lsa mlhash mkan 3l board . awel aw tani aw talet wa7da msh far2a 
    		if (this.movements[this.movements.length-1].row==null){ 
	    		// el satreen dol lma nezlo ta7t 7sal error , we da ma3nah en function l animation bta3et ticker btbda2 ttndeh awellll ma a2olaha add , 3ashan kda ml7e2sh ywsal lel satren dol lma kaono ta7t we drab error en this.hand = null
	            if (this.turn && this.waiting==false) this.hand = this.hands[0];
	            else this.hand = this.hands[1];

	    		//logic of movement here ..
	    		if (this.movements.length == 1) //awel wa7da tt7at we htndah hya el animation ticker
	    		{
					this._animationFunction = this.moveHandtoTile.bind(this)
					this.movements[this.movements.length-1].row = row;
					this.movements[this.movements.length-1].col = col;
					this.animationStartingPos = {x:this.hand.container.position.x, y:this.hand.container.position.y};
		            this.movements[this.movements.length-1].selectedTile.animationStartingPos = {x:this.movements[this.movements.length-1].selectedTile.container.position.x, y:this.movements[this.movements.length-1].selectedTile.container.position.y};
		    		this.animationT1 = 0;
		    		this.animationT2 = 0;
		            this.animationT3 = 0;
		            this.moving = true;
		            this.app.ticker.add(this._animationFunction);
		            // simulating the mouse click position by calculating the mouseclick position that would give this row col
		            // note: animation function uses this value and i didnt want to change it so i recalculated what it needed
		            this.mouseClickPos = {x: ((670 - 225)/15) * col + 225 + ((670 - 225)/15)/2, y: ((575 - 100)/15) * row + 100 + ((575 - 100)/15) / 2};
		            //console.log("USED: ", this.movements[this.movements.length-1].selectedTile.getUsed())
		            if (this.turn == true && this.waiting==false){
		            	if (typeof this.movements[this.movements.length-1].selectedTile.row !== 'undefined')
		            		this.grid[this.movements[this.movements.length-1].selectedTile.row][this.movements[this.movements.length-1].selectedTile.col] = '.';
			    		// if (this.movements[this.movements.length-1].selectedTile.getUsed())
							// this.grid[this.movements[this.movements.length-1].selectedTile.row][this.movements[this.movements.length-1].selectedTile.col] = '0';		            	
			           	this.movements[this.movements.length-1].selectedTile.row = row;
			    		this.movements[this.movements.length-1].selectedTile.col = col;
			    		if (!this.lastPlayed.includes(this.movements[this.movements.length-1].selectedTile))
			    			this.lastPlayed.push(this.movements[this.movements.length-1].selectedTile)
			        }
		            this.grid[row][col] = 'X';

	        	} else {
	        		//msh awel wa7da
	        		if (this.movements[this.movements.length-1].selectedTile != this.selectedTile){ //el condition da 3ashan ymnda3 el clicking 3la board fi kaza 7eta wel animation shaghal we m5trtesh tile gdida
						// 3ashan this.selectedTile di wna fl animation mmkn tb2a new selected tile 3adi aw tkon el selected tile b3at l animation el fat 3ashn ba7oto fiha gowa el animation le 7agat Hager
	        			this.movements[this.movements.length-1].row = row;
						this.movements[this.movements.length-1].col = col;
		            	this.movements[this.movements.length-1].selectedTile.animationStartingPos = {x:this.movements[this.movements.length-1].selectedTile.container.position.x, y:this.movements[this.movements.length-1].selectedTile.container.position.y};
						if (this.turn == true && this.waiting==false){
				    		if (typeof this.movements[this.movements.length-1].selectedTile.row !== 'undefined')
		            			this.grid[this.movements[this.movements.length-1].selectedTile.row][this.movements[this.movements.length-1].selectedTile.col] = '.';
							// if (this.movements[this.movements.length-1].selectedTile.getUsed())
								// this.grid[this.movements[this.movements.length-1].selectedTile.row][this.movements[this.movements.length-1].selectedTile.col] = '0';		            	
				           	this.movements[this.movements.length-1].selectedTile.row = row;
				    		this.movements[this.movements.length-1].selectedTile.col = col;
				        	if (!this.lastPlayed.includes(this.movements[this.movements.length-1].selectedTile))
			    				this.lastPlayed.push(this.movements[this.movements.length-1].selectedTile)
				        }
			            this.grid[row][col] = 'X';		        	}
	        	}
	            
			} 
			// aw lma yb2a fi 7aga btt7arak dlwa2ty asln 
			else {

				if (this.movements[this.movements.length-1].selectedTile != this.selectedTile){ //el condition da 3ashan ymnda3 el clicking 3la board fi kaza 7eta wel animation shaghal we m5trtesh tile gdida
					// 3ashan this.selectedTile di wna fl animation mmkn tb2a new selected tile 3adi aw tkon el selected tile b3at l animation el fat 3ashn ba7oto fiha gowa el animation le 7agat Hager
					this.movements.push({
						'selectedTile': this.selectedTile,
						'row': row,
						'col': col
					});
					if (this.turn == true && this.waiting==false){
			    		if (typeof this.movements[this.movements.length-1].selectedTile.row !== 'undefined')
		            		this.grid[this.movements[this.movements.length-1].selectedTile.row][this.movements[this.movements.length-1].selectedTile.col] = '.';
						// if (this.movements[this.movements.length-1].selectedTile.getUsed())
							// this.grid[this.movements[this.movements.length-1].selectedTile.row][this.movements[this.movements.length-1].selectedTile.col] = '0';		            	
			           	this.movements[this.movements.length-1].selectedTile.row = row;
			    		this.movements[this.movements.length-1].selectedTile.col = col;
			        	if (!this.lastPlayed.includes(this.movements[this.movements.length-1].selectedTile))
			    			this.lastPlayed.push(this.movements[this.movements.length-1].selectedTile)
			        }
		            this.grid[row][col] = 'X';				
		        }
			}
    	}


    },

    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    moveHandtoTile: function(delta){
    	delta = delta*3;
    	// terminating condition
    	if (this.animationT1 >= 60 && this.animationT2 >= 60 && this.animationT3 >= 60) {
    		// console.log("this should mark ending animation")
            this.moving = false;
			this.character=this.selectedTile.container.children[2].text;
			this.movements.shift();
            //this.selectedTile = null; //da el satr el wa7id el bymna3 eni al3ab fi dor el odami , 3ashan hwa lw doro , we kan m3aia el selected tile hya hya we dost ai 7ta fl board , ana msh bas2al hna hwa dori wla la2 , 3ashan asln l mfrod el animation y7sal fi dori we msh dori kda kda
        	//this.turn = this.turn; //my turn is true
			
			//mfrod b2a lw el queue msh fadya mashelsh di , lw msh fadia we awel wa7da 3ndha row kman
			if (!this.movements.length)
				this.app.ticker.remove(this._animationFunction);
			else if (this.movements[0].row==null)
				this.app.ticker.remove(this._animationFunction);
			else if (this.movements[0].row!=null){
				//re initialize animation
				// console.log("new animation should start now")
				this.animationStartingPos = {x:this.hand.container.position.x, y:this.hand.container.position.y};
		    	this.animationT1 = 0;
		    	this.animationT2 = 0;
		        this.animationT3 = 0;
		        this.mouseClickPos = {x: ((670 - 225)/15) * this.movements[0].col + 225 + ((670 - 225)/15)/2, y: ((575 - 100)/15) * this.movements[0].row + 100 + ((575 - 100)/15) / 2};
		        this.moving = true;
			}
			if (this.turn == true && this.waiting==false)
				this.destroyTiles();
			if (!this.turn && !this.movements.length){ // dor l AI 5eles (5alas kol l animations)
				this.turn = !this.turn;
				this.waiting=false;
				this.selectedTile = null;
				// IMPORTANT - mkanha b2a msh hna , ba2et on play bta3et el AI 
				this.lastPlayedCopy = this.lastPlayed.slice();
				this.lastPlayed = [];

			}
        }
        // starting condition
        if (this.animationT1 == 0 && this.animationT2 == 0 && this.animationT3 == 0){
        	this.selectedTile = this.movements[0].selectedTile;
        }
    	//to move towards a tile
    	if (this.animationT1 <= 60) {
    		this.hand.container.position.x = this.animationStartingPos.x + this.easeOutQuart(this.animationT1/60) * (this.selectedTile.animationStartingPos.x - this.animationStartingPos.x);
    		this.hand.container.position.y = this.animationStartingPos.y + this.easeOutQuart(this.animationT1/60) * (this.selectedTile.animationStartingPos.y - this.animationStartingPos.y);
    		this.animationT1 = this.animationT1 + delta;
    	}

    	//to move towards mouse click
    	if (this.animationT1 >= 50 && this.animationT2 <= 60){
    		this.hand.container.position.x = this.selectedTile.animationStartingPos.x + this.easeOutQuart(this.animationT2/60) * (this.mouseClickPos.x - this.selectedTile.animationStartingPos.x);
    		this.hand.container.position.y = this.selectedTile.animationStartingPos.y + this.easeOutQuart(this.animationT2/60) * (this.mouseClickPos.y - this.selectedTile.animationStartingPos.y);	
    		this.selectedTile.container.position.x = this.hand.container.position.x;
            this.selectedTile.container.position.y = this.hand.container.position.y;
            this.animationT2 = this.animationT2 + delta;
    	}

        //to move hand out of game
        if (this.animationT2 >= 50 && this.animationT3 <= 60){
        	if (this.movements.length>1 && this.movements[this.movements.length-1].row!=null) //y3ni na2es wa7da kman 3l a2al b3d el ana fiha
        	{
        		this.animationT3 = 61
        	}
            else {
	            this.hand.container.position.x = this.mouseClickPos.x + this.easeOutQuart(this.animationT3/60) * (this.app.screen.width / 2 + 30 - this.mouseClickPos.x);
	            if (this.turn&& this.waiting==false)
	            	this.hand.container.position.y = this.mouseClickPos.y + this.easeOutQuart(this.animationT3/60) * (this.app.screen.height + 120 - this.mouseClickPos.y); 
	            else
	            	this.hand.container.position.y = this.mouseClickPos.y + this.easeOutQuart(this.animationT3/60) * (-120 - this.mouseClickPos.y);	
            }
             
            this.animationT3 = this.animationT3 + delta;
           
		}
    },
    //this function called by the network module to set the user tiles
	generateUsersTiles:function(retTiles){
		let tiles=[]
		for(var i=0;i<7;i++)
		{
			tiles[i]=new Tile();
			tiles[i].container.position.set(145+29*i,623);
			tiles[i].container.children[2].text=retTiles[i];
			tiles[i].container.children[3].text=1;//this line should be updated
		}
		this.userTiles=tiles
	},
	destroyTiles:function()
	{
		var j =0;
		//decrement the avilable tiles number
		if(this.selectedTile.getUsed()!=1)
			this.availableTiles--;
		//mark it as used
		this.selectedTile.setUsed(1);
		//shift left the tiles 
		for(var i=0;i<7;i++)
		{
			if(this.userTiles[i].getUsed()==0)
			{	
				this.userTiles[i].container.position.set(145+29*(j),623);
				this.userTiles[i].container.rotation=0;
				j++;
			}
		}
		this.selectedTile = null;
		
		
	},
	setExchange:function() {
		this.exchange=!this.exchange;
	},
	isEmpty:function(row, col){
		if (this.grid[row][col] == '.') return true;
		else return false;
	},
	aiTurn:function()
	{
		//here we need to chnge the number of calls based on the server output
		this.movements.push({
					'selectedTile': tiles[0],
					'row': null,
					'col': null
				});
		this.boardClick(1,2);
		console.log("now the turn = ",this.turn );
	},
	aiOk:function() {
		this.turn = !this.turn;

		// IMPORTANT
		this.lastPlayed = [];
	},
	setTurn:function(t){
		this.turn=t
		//this.lastPlayed = [];
	},
	showTurn:function(){
		if (GameplayManager.get().turn)
			GameplayManager.get().turnText.containerPointer.children[0].text = "Your turn"
		else 
			GameplayManager.get().turnText.containerPointer.children[0].text = "AI's turn"
	},
	checkValidity:function(){
		console.log("validating")
		if (!this.lastPlayed.length) return false;
		let samerow = true; let samecol = true;
 		for (let i= 1; i < this.lastPlayed.length; i++){
			if (this.lastPlayed[i].row != this.lastPlayed[i-1].row) samerow=false;
			if (this.lastPlayed[i].col != this.lastPlayed[i-1].col) samecol=false;
			if (!samerow && !samecol) 
				return false;
		}
		this.lastPlayed.sort(function(a,b){ if (samerow) return a.col - b.col; if (samecol) return a.row - b.row; })
		// for (let i= 1; i < this.lastPlayed.length; i++){
		//	if ( ( samerow && this.lastPlayed[i].col - this.lastPlayed[i-1].col > 1 )
		//	 		|| ( samecol && this.lastPlayed[i].row - this.lastPlayed[i-1].row > 1 ) ) return false;
		// }
		let col = this.lastPlayed[0].col;
		let row = this.lastPlayed[0].row;
		if (samerow){
			while (col < this.lastPlayed[this.lastPlayed.length-1].col){
				if (this.grid[row][col]!='X') return false;
				console.log(col)
				col++;
			}
		}
		if (samecol){
			while (row < this.lastPlayed[this.lastPlayed.length-1].row){
				if (this.grid[row][col]!='X') return false;
				console.log(row)
				row++;
			}
		}

		return true;
	},
	playInfo:function()
	{
		//this function extract the info of the last play to bbe sent to the server
		let tiles=[]
		let row=this.lastPlayed[0].row
		let col=this.lastPlayed[0].col
		let dir=0 //zero if in the same row else 1
		var i=0
		console.log("len",this.lastPlayed.length)
		for(i=0;i<this.lastPlayed.length-1;i++)
		{
			if(this.lastPlayed[i].row!=this.lastPlayed[i+1].row)
				dir=1
			tiles[i]=this.lastPlayed[i].container.children[2].text;
			if(tiles[i]!=' ')
				tiles[i]=tiles[i].charCodeAt(0) -64;
			else
				tiles[i]=100
		}
		tiles[i]=this.lastPlayed[i].container.children[2].text;
		if(tiles[i]!=' ')
			tiles[i]=tiles[i].charCodeAt(0) -64;
		else
			tiles[i]=100
		//complete the array
		for (i=i+1;i<7;i++)
			tiles[i]=0
			
		return [row,col,dir,tiles]
	}
};
