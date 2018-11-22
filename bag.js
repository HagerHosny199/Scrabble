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
			console.log(exTiles);
			//need to be exchanged
			if(exTiles[i]==1)
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
	
	//this function generates the n tiles of the user 
	generateUserTiles:function(n){
		var tiles={};
		var value={};
		var num=0;
		//generate random 
			while(num<n)
			{
				this.random=this.generateRandom();
				if(availableTiles[this.random-1]>0)
					{
						//add the tile to the returned bag
						tiles[num]=this.characters[this.random-1];
						value[num]=this.values[this.random-1];
						availableTiles[this.random-1]--;
						num++;
					}
			}
		return [value,tiles];
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