<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<!DOCTYPE html>
 
<html>
    <head>
        <title>Canvas - Destruction Ball</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styleSheet.css">
         
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
         
        <script>
            $(document).ready(function() {             
            var earth = new Image();
            var gravity = 9.8/20;
            var elasticity = .90;
            var snapShots = [];
            var boxWidth = 695;
            var boxHeight = 500;
            
            var DestructionBall = function(bs, bm, x, y, vx, vy){
                    this.ballSize = bs;
                    this.ballMass = bm;
                    this.positionX = x; 
                    this.positionY = y; 
                    this.originX = x; //maintain the original position of the ball
                    this.originY = y; //maintain the original position of the ball
                    this.velocityX = vx;
                    this.velocityY = vy;      
                    //console.log(this.positionX +"  "+this.positionY);
                    //console.log(this.ballSize +"  "+this.ballMass);
                 };
            
            DestructionBall.prototype.draw = function(context, shade){                
                context.save();
                    context.lineWidth = 1;
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.translate(this.positionX, this.positionY);
                    context.beginPath();
                    context.arc(0, 0, this.ballSize, 0, Math.PI*2,false); 
                    context.closePath();
                    context.fill();
                    context.stroke();
                context.restore();
            };
            
            DestructionBall.prototype.raiseUp = function (context, height, radius)
            {                                
                    this.positionY = this.positionY-height;
                    var heightDiff = radius-height;
                    var hrratio = heightDiff/radius;     //or without heightDiff, 1-height/rad
                    var ballAngle = Math.acos(hrratio);           
                    var ballAngleDegrees = ballAngle*180/Math.PI;
                    console.log("Y:"+this.positionY +" Hgt/Rad:"+ hrratio + " Angel:"+ ballAngle + " Angel:"+ ballAngleDegrees)
                    this.positionX = this.positionX- radius*Math.sin(ballAngle);
                    console.log("X:"+this.positionX +" Rad:"+ radius +" Sin:"+Math.sin(ballAngle));
                    this.draw(context, 1);
                    
            };
            
            
            
            //var rig = new DestructionRig(275, 200, 100, 80, 15, 400, 25, 25, 45, 40);
            var DestructionRig = function(topX, topY, cLength, cHeight, x, y, cIntTop, cIntRight, cLow, cabWS){             
                  this.craneTopX = topX;  //top of crane
                  this.craneTopY = topY;  //top of crane
                  this.cabLength = cLength;
                  this.cabHeight = cHeight;
                  this.cabX = x; 
                  this.cabY = y; 
                  this.craneIntTop = cIntTop;  //top cab crane intersect at X point
                  this.craneIntRight = cIntRight;//right side cab crane intersect at Y point
                  this.craneLow = cLow;     //bottom intersect of crane
                  this.cabWindowSize = cabWS;
                  //console.log(this.cabX +"  "+this.cabY);
                  //console.log(this.cabLength +"  "+this.cabHeight);
            };
            
            DestructionRig.prototype.draw = function(context, shade){                
                context.save();
                    context.lineWidth = 1;
                    context.strokeStyle = 'rgba(100,200,100,'+shade+')';
                    context.fillStyle = 'rgba(0,153,0,'+shade+')';
                    context.translate(this.cabX, this.cabY)
                    context.strokeRect(0,0, this.cabLength, this.cabHeight)
                    context.strokeRect(5,5,this.cabWindowSize, this.cabWindowSize)
                    
                    context.beginPath();                                         
                        context.moveTo(this.craneIntTop, 0);
                        context.lineTo(this.craneTopX-this.cabX, this.craneTopY-this.cabY);
                        context.lineTo(this.cabLength, this.craneIntRight);  
                        context.lineTo(this.craneIntTop, this.craneLow);
                        context.lineTo(this.craneIntTop, 0);
                    context.closePath();                    
                    context.stroke();
                context.restore();
            };
            
            function connectRigBall (rig, ball, shade){
                context.save();
                    context.lineWidth = 2;
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.beginPath();
                        //context.moveTo(rig.craneTopX, rig.craneTopY);
                        context.moveTo(0,0);
                        context.lineTo(0, radiusOfLine);
                        context.stroke();
                context.restore();
                console.log("Rig TopX:"+rig.craneTopX +"  Rig TopY:"+rig.craneTopY);
                console.log("Ball PosX:"+ball.positionX +"  Ball PosY:"+ball.positionY);
            };
            
            function traceArcPath (rig, context, shade, arcPercent) {
                var arcPathStart = Math.PI*0.5+(arcPercent*Math.PI);
                var arcPathFinish = arcPathStart - Math.PI*2*arcPercent;
                context.save();
                    context.lineWidth = 2;                    
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.setLineDash([5]);
                    context.beginPath();                        
                        context.arc(rig.craneTopX, rig.craneTopY, radiusOfLine, arcPathStart, arcPathFinish,true);                                                                 
                    context.stroke();                    
                context.restore();            
            }
            
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");             
            var rig = new DestructionRig(300, 150, 100, 80, 50, 400, 65, 25, 45, 40);
            var ball = new DestructionBall(20, 5, 300, 400, 0, 0);
            
            var radiusOfLine = ball.originY - rig.craneTopY;
            console.log("Radius: "+radiusOfLine);
            
                    
            function init(){                            
              
              ctx.save();  
                ctx.lineWidth = 10;
                ctx.strokeRect(5,5,boxWidth-5,boxHeight-5);
              ctx.restore();
              //ball.draw(ctx, 1);
              rig.draw(ctx, 1);                
              //connectRigBall(rig, ball, ctx, 1);  
            };
            
    
            function getMousePos(canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
                };
            };

            function writeMessage(context, message) {
                
                context.clearRect(100, 25, 380, 50);
                context.strokeRect(100, 25, 380, 50);
                context.font = '12pt Calibri';
                context.fillStyle = 'black';
                context.fillText(message, 100, 50);
              };

            
                init();
        /*   
                currentHeight = 200;
                ctx.clearRect(10,10,boxWidth-15, boxHeight-15);
                rig.draw(ctx, 1);
                ball.raiseUp(ctx, currentHeight, radiusOfLine);
                connectRigBall (rig, ball, ctx, .2);                
                writeMessage(canvas, "Starting ball height: "+currentHeight+"ft");
                dropBall(rig, ball, ctx, 20);
*/
            var velocity = 0;
            var maxVelocity = 0;
            var maxIterations = 1000;
            var countIterations = 1000;
            var initialAngle = Math.PI*40/100;
            
            
            function drawScene(rig, ball, prev, angle, rPend, rBall)
            {
                context.fillStyle = "rgba(255,255,255,1)"; //defines fade out for motion blur
                context.globalCompositeOperation = "destination-out";
                context.fillRect(10, 100, boxWidth-15, boxHeight-115);
                context.fillStyle = "yellow";
                context.strokeStyle = "rgba(0,0,0,"+Math.max(0,1-Math.abs(prev-angle)*10)+")";
                context.globalCompositeOperation = "source-over";
                rig.draw(context, 1);   //draw the rig
                traceArcPath(rig, context, .50, initialAngle/Math.PI); //drawtheAc
                context.save();
                  context.translate(rig.craneTopX, rig.craneTopY);
                  context.rotate(angle);
                  connectRigBall (rig, ball, .80);   
                  context.beginPath();
                  context.arc(0, rPend, rBall, 0, Math.PI*2, false);
                  context.fill();
                  context.stroke();                                    
                context.restore();
                
            };
            
            function reportVelocity (velocity, maxVelocity){
                console.log(velocity);
                message1 = "          Velocity:  "+ (-velocity.toFixed(2));                
                message2 = " Max Velocity:  "+ maxVelocity.toFixed(2);
                
                context.clearRect(100, 25, 380, 50);                
                context.strokeRect(100, 25, 380, 50);       
                context.font = '12pt Calibri';
                context.fillStyle = 'black';
                context.fillText(message1, 100, 40);                                
                context.fillText(message2, 100, 60);
            };
            
            function calcAngle (angle)
            
            function PendulumSim(length_m, gravity_mps2, initialAngle_rad, timestep_ms, callback) {
                
                var angle = initialAngle_rad;
                var k = -gravity_mps2/length_m;
                var timestep_s = timestep_ms /1200;
                return setInterval(function () {
                  var acceleration = k * Math.sin(angle);
                  velocity += acceleration * timestep_s; //need to get at this...callback nonsense <<==figure this wou
                  angle    += velocity     * timestep_s;
                  callback(angle);
                }, timestep_ms);
              }

              var canvas = document.getElementById('myCanvas');
              var context = canvas.getContext('2d');
              var prev=0;
              
              var sim = PendulumSim(1, 9.80665, initialAngle, 10, function (angle) {
                var rPend = ball.originY - rig.craneTopY;
                var rBall = ball.ballSize;
                var rBar = 25;//Math.min(canvas.width, canvas.height) * 0.005; ???
                var ballX = Math.sin(angle) * rPend;
                var ballY = Math.cos(angle) * rPend;
                var message = "Message";
                ball.positionX = ballX;
                ball.positionY = ballY;

                drawScene(rig, ball, prev, angle, rPend, rBall);                
                if(Math.abs(velocity)>maxVelocity)
                    maxVelocity=Math.abs(velocity);                
                reportVelocity(velocity, maxVelocity);
              
                
                
                prev=angle;
              });
            
            
            
            });
        </script>
    </head>
     
    <body>
        <div id="TopTitle"><h2>Crane Velocity Simulation</h2></div>
        <div id="pane">
            <canvas id="myCanvas" width="700" height="525">
                <!-- Insert fallback content here -->
            </canvas>
            [[text 1]]
        </div>   
        <div id="rightPane">
            [[text 2]]
        </div>
        
    </body>
    
    <script>
    
    /*
    ctx.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(ctx, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
      }, false);*/
      
    
    

          
            
    </script>
</html>
