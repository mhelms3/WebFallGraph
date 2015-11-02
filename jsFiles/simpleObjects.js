/* 
 * Copyright CEISMC, 2015
 */

var screenObject = function(bh, bw){
        this.boxHeight = bh;
        this.boxWidth = bw;
        this.yArcEdge = 0;
        this.xArcEdge = 0;
     };


var timerObject = function(){
        this.maxTime = 0.5;
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
                  this.timeDelta = .014;
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
    //DRAG IS DISABLED
    //this.dragFlag = false; 
    this.shatterFlag  = false;                
    this.moveFlag = false;
    this.wreckageFlag = false;
    this.helmetFlag = false;
    
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
    
         this.lameSayings.push("Weak sauce, brah");
         this.lameSayings.push("My grandma skates better");
         this.lameSayings.push("Afraid of skinning your knee?");
         this.lameSayings.push("Perhaps we shall watch the paint dry next?");
         this.lameSayings.push("Do you still swim in the kiddie pool, too?");
         this.lameSayings.push("Fried fish fingers");
         this.lameSayings.push("Tarter it up");
         this.lameSayings.push("Knock. Knock.");
         
         
         this.goodSayings.push("Shushers, man");
         this.goodSayings.push("Son of a toot");
         this.goodSayings.push("Back...and forth...and back....and forth");
         this.goodSayings.push("Life is like a box of chocolates.");
         this.goodSayings.push("The cake is a lie.");
         this.goodSayings.push("Rousing good show, governer.");
         this.goodSayings.push("Pip pip.");
         this.goodSayings.push("Who's there?");
         
         this.awesomeSayings.push("Cowabunga little dude");
         this.awesomeSayings.push("Grabbin' some air!");
         this.awesomeSayings.push("Shredding it!");
         this.awesomeSayings.push("Super laser awesome sauce!");
         this.awesomeSayings.push("Who ordered the pizza?");
         this.awesomeSayings.push("Like, totally, ya know");
         this.awesomeSayings.push("Got my CHEEZE WHIZ BOY?");
         this.awesomeSayings.push("Flower power, puff'n'floof");
         this.awesomeSayings.push("Pumpkin spiced lattes for everyone!");
         this.awesomeSayings.push("Live long and prosper. Spock out.");
         this.awesomeSayings.push("Pumpkin on a roll!");
         this.awesomeSayings.push("Banana! Banana who?");
         this.awesomeSayings.push("Banana! Banana who?");
         this.awesomeSayings.push("Banana! Banana who?");
         this.awesomeSayings.push("Orange you glad I didn't say banana");
         
         
         this.dizzySayings.push("I think I'm going to hurl");
         this.dizzySayings.push("My brain is melting");
         this.dizzySayings.push("MATHMATICAL!");
         this.dizzySayings.push("Whoa! Algerbraic!");
         this.dizzySayings.push("Slamacow!");
         this.dizzySayings.push("I feel radder, faster.");
         this.dizzySayings.push("No worms on the bed");
         this.dizzySayings.push("Holy stuff. Wow-cow-chow.");
         this.dizzySayings.push("Its pretty math on the pumpkin path.");
         this.dizzySayings.push("Werewolves. Mush worse than ogres.");
         this.dizzySayings.push("Release the pumpkin bomb");
         this.dizzySayings.push("Will a pumpkin ever go to space?");
    };
 
sayings.prototype.output = function()
{
    for(i=0; i<this.lameSayings.length; i++)
        console.log(this.lameSayings[i]);
    for(i=0; i<this.goodSayings.length; i++)
        console.log(this.goodSayings[i]);
    
};
