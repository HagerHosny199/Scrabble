
let GameplayManager = function(){

	if (typeof GameplayManager.instance != 'undefined'){
	    console.log("GameplayManager already initialized before")
	    return GameplayManager.instance;
	}

	console.log("Initializing GameplayManager object")

	this.turn = true; //my turn is true
	this.selectedTile = null;
	this.movements = [];
	this.hands = [null,null];
	this.app = Graphics.get().app;

	this.animationStartingPos;
    this.animationT1;
    this.animationT2;
    this.animationT3;
    this.randomDir; 
    this.moving = false;
    this.tileSound = null;
	//to generate the tiles of each user
	//get the available bag
	this.bag=new Bag();
	this.user1;
	this.user2;
	this.userTiles;
	//shift logic
	this.selctedNum;
	this.availableTiles=7;
	this.tileAppend=7;
	this.chracter;
	//exchange logic
	//this.genTiles=new GenerateTiles(this.app,null,this.userTiles);
	this.exchange=false;
	this.exchangedTiles=[];
	this.used=[0,0,0,0,0,0,0];
    GameplayManager.instance = this;
    

    this.init();
}

GameplayManager.get = function(){
    return GameplayManager.instance;
}

GameplayManager.prototype = {
    init: function(){
    	this.hands[0] = new Hand();
    	this.hands[1] = new Hand();
    	
    	this.hands[1].container.x = this.app.screen.width / 2 + 30;
        this.hands[1].container.y = -120;
        this.hands[1].container.rotation = 3.25
    },


    // called from the tile onClick function
    tileClick: function(tile){
		//check exchange condition
		if(this.exchange == true) //de mmkn tdrb f case en e7na el etnin bndos f nfs el w2t 
		{
			//highlight the tile only
			var ex=tile.addShadow();
			for(var i =0;i<7;i++)
			{
				if(ex[i]==1)
					this.exchangedTiles[i]=1;
			}
		}
    	else if (this.turn == true)
		{
    		//old
    		//this.selectedTile = tile;
			
    		//new 
    		if (this.movements.length == 0)
    			this.movements.push({
    				'selectedTile': tile,
    				'row': null,
    				'col': null
    			});
    		else if (this.movements[0].row == null) //lw awel movement fl list lsa ma5adtsh l desired location , y3ni dost 3la tile we b3dha tile tani
    			this.movements[0].selectedTile = tile;
    		else //lw el case en fi wa7da bttle3eb b2a dlwa2ty wana 3aiz a7ot wa7da tania fl movements
    			this.movements.push({
    				'selectedTile': tile,
    				'row': null,
    				'col': null
    			});
			this.selctedNum=(tile.container.position.x-145)/29;
			console.log(this.selctedNum);
				//TODO call a function in Tile class to set the sprite to Glow effect (selected)
    	}
    },


    selectTile: function (letter){ //or any kind of identifier for the tile
    	
    	//TODO: loop through all the tiles bag to select the required tile
    	// used when the tile name arrives from the network request
    	// finds the required tile and calls tileClick(tile) with it
    
    },

    getmovingornot: function(){return this.moving},

    boardClick: function(row,col,action){
    	
    	// NOTE: the network/communication module can call this function after setting the selected tile
    	// with the desired (row, col) position to simulate the mouse click on game board
		console.log(row,col,action);
    	if(action=='shuffle'&& this.turn==true)
		{
			//shuffle condition 
			this.userTiles=this.bag.shuffle(this.userTiles);
			console.log("shuffle");
		}
		else if(action=='exchange'&& this.turn==true)
		{
			let gen;
			if(this.exchange==false)//exchange condition
				gen=new GenerateTiles(this.app,this.board,this.userTiles);
			console.log("exchange");
			
		}
		else if (action=='ok' && this.turn==true)
		{
			//OK cond 
			console.log("OK");
			//check if the available tiles less than 7 
			if(this.availableTiles<7)
			{
				//now this is not my turn 
				this.turn = !this.turn; 
				//complete the tiles to have 7
				this.userTiles=this.bag.completeTiles(this.userTiles,this.availableTiles);
				this.availableTiles=7; //m7tagen nzbot el cond de 
				console.log("ok :",this.turn);
				
			}
			//else ignore the press
		}
		else if (row>14 || col>14) return;
		//check if exchange and go 
		if (this.exchange==true && row>=8 && row <=9 && col>=8 && col <=9)
		{
			//remove the board 
			GenerateTiles.get().removeBorad();
			//toggle exchange
			this.setExchange();
			//exchange the tiles 
			this.userTiles=this.bag.exchange(this.userTiles,this.exchangedTiles);
			
			
		} 
    	//old
    	//else if (this.selectedTile){
    	//new
    	else if (this.movements.length){
    		//el click l gdida mlhash => y3ni doosa gdida we lsa mlhash mkan 3l board . awel aw tani aw talet wa7da msh far2a 
    		if (this.movements[this.movements.length-1].row==null){ 
	    		// el satreen dol lma nezlo ta7t 7sal error , we da ma3nah en function l animation bta3et ticker btbda2 ttndeh awellll ma a2olaha add , 3ashan kda ml7e2sh ywsal lel satren dol lma kaono ta7t we drab error en this.hand = null
	            if (this.turn) this.hand = this.hands[0];
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
	        	} else {
	        		//msh awel wa7da
	        		this.movements[this.movements.length-1].row = row;
					this.movements[this.movements.length-1].col = col;
		            this.movements[this.movements.length-1].selectedTile.animationStartingPos = {x:this.movements[this.movements.length-1].selectedTile.container.position.x, y:this.movements[this.movements.length-1].selectedTile.container.position.y};
		            console.log("new animation added")
	        	}
	            
			} 
			// aw lma yb2a fi 7aga btt7arak dlwa2ty asln 
			else {
				this.movements.push({
					'selectedTile': this.selectedTile,
					'row': row,
					'col': col
				});
			}
    	}


    },

    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    moveHandtoTile: function(delta){
    	delta = delta*1.2;
    	// terminating condition
    	if (this.animationT1 > 60 && this.animationT2 > 60 && this.animationT3 > 60) {
            this.moving = false;
			this.character=this.selectedTile.container.children[2].text;
			this.movements.shift();
            //this.selectedTile = null; //da el satr el wa7id el bymna3 eni al3ab fi dor el odami , 3ashan hwa lw doro , we kan m3aia el selected tile hya hya we dost ai 7ta fl board , ana msh bas2al hna hwa dori wla la2 , 3ashan asln l mfrod el animation y7sal fi dori we msh dori kda kda
        	//this.turn = this.turn; //my turn is true
			this.destroyTiles();

			//mfrod b2a lw el queue msh fadya mashelsh di , lw msh fadia we awel wa7da 3ndha row kman
			if (!this.movements.length)
				this.app.ticker.remove(this._animationFunction);
			else if (this.movements[0].row==null)
				this.app.ticker.remove(this._animationFunction);
			else if (this.movements[0].row!=null){
				//re initialize animation
				console.log("new animation should start now")
				this.animationStartingPos = {x:this.hand.container.position.x, y:this.hand.container.position.y};
		    	this.animationT1 = 0;
		    	this.animationT2 = 0;
		        this.animationT3 = 0;
		        this.mouseClickPos = {x: ((670 - 225)/15) * this.movements[0].col + 225 + ((670 - 225)/15)/2, y: ((575 - 100)/15) * this.movements[0].row + 100 + ((575 - 100)/15) / 2};

			}
        }
        // starting condition
        if (this.animationT1 == 0 && this.animationT2 == 0 && this.animationT3 == 0){
        	this.selectedTile = this.movements[0].selectedTile;
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
        	if (this.movements.length>1) //y3ni na2es wa7da kman 3l a2al b3d el ana fiha
        	{
        		this.animationT3 = 60
        		console.log("heereeeeeeeeeeeeeeeeeee")
        	}
            //this.tileSound.play();
            else {
            this.hand.container.position.x = this.mouseClickPos.x + this.easeOutQuart(this.animationT3/60) * (this.app.screen.width / 2 + 30 - this.mouseClickPos.x);
            if (this.turn)
            	this.hand.container.position.y = this.mouseClickPos.y + this.easeOutQuart(this.animationT3/60) * (this.app.screen.height + 120 - this.mouseClickPos.y); 
            else
            	this.hand.container.position.y = this.mouseClickPos.y + this.easeOutQuart(this.animationT3/60) * (-120 - this.mouseClickPos.y);	
            }
             
            this.animationT3 = this.animationT3 + delta;
           
		}

    	//if (this.randomDir)
    	//	this.hand.container.rotation += 0.004 * delta;
    	//else
    	//	this.hand.container.rotation -= 0.004 * delta;
    },
	generateUsersTiles:function(num){
		var value1={};
		var value2={};
		
		var temp=this.bag.generateUserTiles(num);
		value1=temp[0];
		this.user1=temp[1];
		
		console.log(value1);
		
		temp=this.bag.generateUserTiles(num);
		value2=temp[0];
		this.user2=temp[1];
		console.log(value2);
		for(var i=0;i<num;i++)
		{
			tiles[i]=new Tile();
			tiles[i].container.position.set(145+29*i,623);
			tiles[i].container.children[2].text=this.user1[i];
			tiles[i].container.children[3].text=value1[i];
		}
		this.userTiles=tiles;
		return tiles;
	},
	destroyTiles:function(num)
	{
		//add instance from the moved tile
		/*this.userTiles[this.tileAppend]=new Tile();
		this.userTiles[this.tileAppend].container.position.set(this.userTiles[num].container.position.x,this.userTiles[num].container.position.y);
		this.userTies[this.tileAppend].container.children[2].text=this.character;
		this.tileAppend++;
		*/
		this.used[num]=1;
		//shift left the tiles 
		for(var i=num+1;i<this.availableTiles;i++)
		{
			this.userTiles[i].container.position.set(145+29*(i-1),623);
			//this.userTiles[i].container.children[2].text=this.userTiles[i].container.children[2].text;
			this.userTiles[i].container.rotation=0;
		}
		//remove the last one from the view
		//this.userTiles[this.availableTiles-1].container.position.set(-100,-100);
		//decrement the avilable tiles number
		this.availableTiles--;
		this.selectedTile = null;
		
	},
	setExchange:function()
	{
		this.exchange=!this.exchange;
	}
	,
	aiTurn:function()
	{
		//here we need to chnge the number of calls based on the server output
		this.selectedTile = tiles[0];
		this.turn=!this.turn;
		this.boardClick(1,2);
		console.log("now the turn = ",this.turn );
	}
};
