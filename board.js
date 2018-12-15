
let Board = function () {
	this.path = 'assets/scrabble3.png';
    this.sprite;
    this.visible = true;
    this.clickable = true;
    this.selectedTile = null;
    this.app = Graphics.get().app; 
	this.sound=null;
	this.button1=null;
	this.button2=null;
	this.button3=null;
	this.button4=null;
	this.score=null;
    this.gameTime=20*60*1000;
    this.user1Time=10*60*1000;
    this.user2Time=10*60*1000;
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
		
		this.button1=new Button(this.app,'exchange',1,'board');
		this.button2=new Button(this.app,'shuffle',2,'board');
		this.button3=new Button(this.app,'ok',3,'board');
		this.button3=new Button(this.app,'pass',4,'board');
		this.score=new Score(this.app);
		this.timer=new Timer(this.app);
		this.sound = PIXI.sound.Sound.from('assets/game_scrabble_game_board_put_in_box_2.mp3');
		this.sound.play();      
        // show :
        // "You" , "otherplayer"
        // "score: 0" , "score: 0"
        // "time remaining: 0" , "time remaining: 0"
        // el sa3b hyb2a eni a3ed el time mn minutes le seconds w keda, lw la2et 7aga fiha timer tdini l time a7san

    },
    updateTime:function(playerNum,value)

	{
        var min;
		if(playerNum==1)
			{
                //update the totl remaining time
                this.user1Time=value
                //convert time to the displaying format
                min=this.convertTime(value);
                
                min[0]=min[0].toString();
                min[1]=min[1].toString();

                if(min[0].length==1)
                    value='0'+min[0];
                else
                    value=min[0];

                if(min[1].length==1)
                    value+=':0'+min[1];
                else
                    value+=':'+min[1];
                //update the time 
                this.timer.container.children[0].text=value;
            }
		else
			{
                //update the totl remaining time
                this.user2Time=value
                //convert time to the displaying format
                min=this.convertTime(value);

                min[0]=min[0].toString();
                min[1]=min[1].toString();

                if(min[0].length==1)
                    value='0'+min[0];
                else
                    value=min[0];

                if(min[1].length==1)
                    value+=':0'+min[1];
                else
                    value+=':'+min[1];
                //update the time 
                this.timer.container.children[1].text=value;
            }
	},
    convertTime:function( ms ) 
    {
        // 1- Convert to seconds:
        var seconds = ms / 1000;
        // 2- Extract minutes:
        var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 3- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;
        seconds=Math.round(seconds)
        minutes=Math.round(minutes)

        return [minutes,seconds]
    },
    updateGameTime:function(value)
    {
        this.gameTime=value;
        //convert time to the displaying format
        min=this.convertTime(value);
                
        min[0]=min[0].toString();
        min[1]=min[1].toString();

        if(min[0].length==1)
            value='0'+min[0];
        else
            value=min[0];

        if(min[1].length==1)
            value+=':0'+min[1];
        else
            value+=':'+min[1];
        //update the time 
        this.timer.container.children[2].text=value;
    },
	updateScore:function(playerNum,value)
	{
		//human player
		if(playerNum==1)
		{
			value=value+parseInt(this.score.container.children[1].text,10);
			this.score.container.children[1].text=value;
		}
		else //AI
		{
			value=value+parseInt(this.score.container.children[2].text,10);
			this.score.container.children[2].text=value;
		}
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
		console.log(x,y);
		if ( x < 225 || x > 670 || y < 100 || y > 575)
            console.log("Click out of board bounds");
        else 
		{
            // calculate (row, col)
            let col = (x - 225) / ((670 - 225)/15);
            let row = (y - 100) / ((575 - 100)/15);
            //console.log("click on row:" + Math.floor(row) + ", col: " + Math.floor(col));
            GameplayManager.get().boardClick(Math.floor(row), Math.floor(col),null);
        }

    }
};


