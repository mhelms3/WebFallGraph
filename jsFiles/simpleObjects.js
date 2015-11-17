/* 
 * Copyright CEISMC, 2015
 */

var screenObject = function(bh, bw){
        this.boxHeight = bh;
        this.boxWidth = bw;
        this.yArcEdge = 0;
        this.xArcEdge = 0;
        
        this.wallImage = new Image();
        this.wallImage.src = "imageFiles/cautionWall.png";
        
        this.backGroundImage = [];
        this.backGroundImage[0] = new Image();
        this.backGroundImage[0].src = "imageFiles/labBackground3.png";
        this.backGroundImage[1] = new Image();
        this.backGroundImage[1].src = "imageFiles/labBackground.png";
        this.backGroundImage[2] = new Image();
        this.backGroundImage[2].src = "imageFiles/cityBackground3.png";
     };


var timerObject = function(){
        this.maxTime = 0.1;
        this.totalTime = 0;
        this.numTime = 0;
        this.lastTime = 0;
        this.timePrev = 0;
        this.timeNow = 0;
        this.timeDelta = 0;
     };
     
timerObject.prototype.update = function(){
          if (this.timeNow)
              {
                  this.timePrev = this.timeNow;
                  this.timeNow = new Date().getTime();                         
              }
              else
              {
                  this.timeNow = new Date().getTime(); 
                  this.timePrev = this.timeNow +1;                        
              }                    
              this.timeDelta = (this.timeNow - this.timePrev)/1200;  

              if(this.timeDelta>this.maxTime)
                  this.timeDelta = .0005;
      };
            
var physicsObject = function(g, df){
        this.gravity = g;
        this.dragFactor = df;                    
     };

var flags = function(){
    this.drawFlag = true;
    this.noRampFlag = true;
    this.graphFlag = true;
    this.arcFlag = true;
    this.hiddenControlsFlag = true;
    //DRAG IS DISABLED
    //this.dragFlag = false; 
    this.shatterFlag  = false;                
    this.moveFlag = false;
    this.wreckageFlag = false;
    this.helmetFlag = false;
    this.percentFlag=false;
    this.sensorFlag=false;
    
    this.trickFlag=false;    
    this.messageFlag = false;
    
    this.passcode = 1;
};

var scene = function (screen, timer, physics, flags, mover, rig)
{
    this.screen = screen; 
    this.timer = timer;
    this.physics = physics;
    this.flags = flags;
    this.mover = mover;
    this.rig = rig;
   
};

var sayings = function ()
{
    this.lameSayings = [];
    this.goodSayings = [];
    this.awesomeSayings = [];
    this.dizzySayings = [];
    };

sayings.prototype.initializeSayings = function()
{
    
         this.lameSayings.push("Weak sauce");
         this.lameSayings.push("I've seen gophers skate better");
         this.lameSayings.push("Afraid of skinning your knee?");
         this.lameSayings.push("Perhaps we shall watch the paint dry next?");
         this.lameSayings.push("We all have to learn somewhere");
         this.lameSayings.push("My other vehicle is a TARDIS");
         this.lameSayings.push("Fish fingers and custard");
         this.lameSayings.push("Tarter it up");
         this.lameSayings.push("Knock. Knock.");
         this.lameSayings.push("Try try try");
         this.lameSayings.push("Snail");
         
         
         this.goodSayings.push("Shushers, man");
         this.goodSayings.push("Son of a toot");
         this.goodSayings.push("Back...and forth...and back....and forth");
         this.goodSayings.push("Life is like a box of chocolates.");
         this.goodSayings.push("The cake is a lie.");
         this.goodSayings.push("Rousing good show, governer.");
         this.goodSayings.push("Pip pip.");
         this.goodSayings.push("Who's there?");
         this.goodSayings.push("Have you seen my space hamster, Boo?");
         this.goodSayings.push("The end is the beginning is the end");
         
         
         this.awesomeSayings.push("Cowabunga little dude");
         this.awesomeSayings.push("Grabbin' some air!");
         this.awesomeSayings.push("Shredding it!");
         this.awesomeSayings.push("Super laser awesome sauce!");
         this.awesomeSayings.push("Who ordered the pizza?");
         this.awesomeSayings.push("Like, totally, ya know");
         this.awesomeSayings.push("Got my CHEEZE WHIZ?");
         this.awesomeSayings.push("Pumkin power!");
         this.awesomeSayings.push("Pumpkin spiced lattes for everyone!");
         this.awesomeSayings.push("Live long and prosper. Spock out. ");
         this.awesomeSayings.push("Pumpkin on a roll!");
         this.awesomeSayings.push("Banana! Banana who?");
         this.awesomeSayings.push("Orange you glad I didn't say banana");
         this.awesomeSayings.push("Heavy metal machine!");
         
         
         this.dizzySayings.push("I think my pumkin seeds are falling out");
         this.dizzySayings.push("My brain is spinning");
         this.dizzySayings.push("MATHMATICAL!");
         this.dizzySayings.push("Whoa! Algerbraic!");
         this.dizzySayings.push("Slamacow!");
         this.dizzySayings.push("I feel radder, faster.");
         this.dizzySayings.push("Did I just blind you with SCIENCE!");
         this.dizzySayings.push("Holy stuff. Wow-cow-chow.");
         this.dizzySayings.push("I am a leaf on the wind!");
         this.dizzySayings.push("Release the pumpkin bomb");
         this.dizzySayings.push("Pumpkins...In....Spaaaaaace!");
         this.dizzySayings.push("Rocket mode unlocked.");
         this.dizzySayings.push("Mellon Collie and the Infinite Sadness");
         this.dizzySayings.push("Raindrops + Sunshowers");
         this.dizzySayings.push("Rhinoceros and Mayonaise");
         
    };
 
sayings.prototype.output = function()
{
    for(i=0; i<this.lameSayings.length; i++)
        console.log(this.lameSayings[i]);
    for(i=0; i<this.goodSayings.length; i++)
        console.log(this.goodSayings[i]);
    
};
