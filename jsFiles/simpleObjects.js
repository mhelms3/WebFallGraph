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