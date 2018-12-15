let Bag = function(){
	this.availableTiles=[]; //this will hold the tiles bag 
	this.characters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '];
	this.values=[1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10,0];
	this.random;
	this.init();
}
Bag.prototype = {
	init: function(app){
		//init our tiles bag
		availableTiles=[9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1,2];
		console.log(availableTiles);
	},
	
	//this function is used to exchange certain num of tiles 
	exchange:function(tiles,exTiles){
		var retTiles=[];
		for(var i =0;i<7;i++)
		{
			console.log("used or not ",tiles[i].getUsed());
			//need to be exchanged
			if(exTiles[i]==1 && tiles[i].getUsed()!=1)
			{
				if(availableTiles.length>=0)
				{
					//keep generating random number until meeting the conditions
					while(true)
					{
						this.random=this.generateRandom();
						if(availableTiles[this.random-1]>0) //check if there is avilable chars
						{
							if(this.characters[this.random-1] != tiles[i]) //check that the tile is not the same as the original
							{
								//put the original tiles to the bag
								if(exTiles[i]==' ')
									availableTiles[26]++;
								else
									availableTiles[exTiles[i]-65]++;
								//add the tile to the returned bag
								tiles[i].container.children[2].text=this.characters[this.random-1];
								tiles[i].container.children[3].text=this.values[this.random-1];
								availableTiles[this.random-1]--;
								break;
							}
						}
					}
				}
			}
		}
		return tiles;
		/*var i=0;
		var tiles={};
		//check if there is the required num 
		if(availableTiles.length>=num)
		{
			//generate random 
			while(num>0)
			{
				this.random=this.generateRandom();
				if(availableTiles[this.random-1]>0)
					{
						//note : lazm a-check eno el generated char msh mwgood f el array el asly wla msh mohm ????
						num--;
						//add the tile to the returned bag
						tiles[i]=this.characters[this.random-1];
						availableTiles[this.random-1]--;
						i++;
					}
			}
			//put the original tiles to the bag
			while(i>0)
			{
				//check if the char is space 
				if(exTiles[i]==' ')
					availableTiles[26]++;
				else
					availableTiles[exTiles[i]-65]++;
				i--;
			}
			return tiles;
		}*/
			
	},
	completeTiles:function(tiles,availableTiles,tileAppend,newTiles)
	{
		// tiles da el array of tiles kolaha , we ba3adi 3la awel 7 a5alihom dol l tiles bto3 l rack
		// tileAppend da el index bta3 el mkan l mfrod abda2 mno 
		// available tiles da ?
		var temp;
		var j=0;
		var mng=GameplayManager.get();
		console.log("now ffrom comp ava:",availableTiles,"tileAppend=",tileAppend);
		if (availableTiles<0)
			availableTiles=0
		for(var i=0;i<7;i++)
		{
			if(tiles[i].getUsed()==1)
			{
				//append the tile to the end of the array
				tiles[tileAppend]=new Tile();
				tiles[tileAppend].container.position.set(tiles[i].container.position.x,tiles[i].container.position.y);
				tiles[tileAppend].container.children[2].text=tiles[i].container.children[2].text;
				tiles[tileAppend].container.children[3].text=tiles[i].container.children[3].text;
				tiles[tileAppend].setUsed(1);
				
				//check blank
				if(newTiles[j]==' ')
					tiles[i].blank=true;
				//generate new tile 
				temp=this.generateUserTiles(newTiles[j]);
				tiles[i].container.children[2].text=newTiles[j++]; //char
				tiles[i].container.children[3].text=temp; //value
				tiles[i].container.position.x=145+29*(availableTiles);
				tiles[i].container.position.y=623;
				tiles[i].container.rotation=0;
				tiles[i].setUsed(0); //
				// Bassem : 7atet da wna msh fahem awi 3ashan bs asala7 el kan by7sl fl grid , 3ashan kont bab2a bal3ab 
				// mn l rack we byb2a lihom arkam row we col we da mynfa3sh 3ashan hy5aloha '.' fl grid
				tiles[i].row = undefined;
				tiles[i].col = undefined;
				//--
				tileAppend++;
				availableTiles++;
				//console.log(temp[1]);
				console.log(tiles[i].blank);
			}
			else if (mng.exchange==true)
			{
				if(mng.exchangedTiles[i]!=0)
				{
				tiles[i].container.children[2].text=tiles[i];
				tiles[i].container.children[3].text=5;
				}
			}
			else 
				console.log(mng.exchange,mng.exchangedTiles)

		}
		
		return [tileAppend,availableTiles,tiles];
	},
	//this function generates the n tiles of the user 
	generateUserTiles:function(character){
		var value=1;
		//generate value
		if(character== ' ')//blank
			value=this.values[26];
		else
		{
			value=character.charCodeAt(0) -65
			value=this.values[value];
		}	
		console.log(character," = ",value)
	return value
	},
	//this function take an array of tiles and shuffle them 
	shuffle:function(array)
	{
		var currentIndex = array.length, tempChar,tempValue, randomIndex;
			console.log(array)

	  // While there remain elements to shuffle...
	    while (0 !== currentIndex) 
		{
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			if(array[currentIndex].getUsed()==0 && array[randomIndex].getUsed()==0)

			{// And swap it with the current element.
			tempChar = array[currentIndex].container.children[2].text;
			tempValue = array[currentIndex].container.children[3].text;
			array[currentIndex].container.children[2].text = array[randomIndex].container.children[2].text;
			array[currentIndex].container.children[3].text = array[randomIndex].container.children[3].text;
			array[randomIndex].container.children[2].text = tempChar;
			array[randomIndex].container.children[3].text = tempValue;
			}
			else
				console.log("nott shuffle");
		}
		//console.log(array);
		return array;
	},
	//this function generates random num between 1 and 27
	generateRandom:function()
	{
		return Math.floor(Math.random() * 27) + 1;
	},
	//get the available tiles 
	getBag:function()
	{
		//console.log("now ",availableTiles);
		return this.availableTiles;
	},
	//get the chars array 
	getChar:function()
	{
		//console.log(this.characters);
		return this.characters;
	},
	getValues:function()
	{
		return this.values;
	}
};