<!DOCTYPE html>
<!--
    Copyright CEISMC, Georiga Institute of Technology, 2015
    Code Author: Michael Helms, PhD
    Last Modified: April 15, 2015
-->

<!DOCTYPE html>
 
<html>
    <head> 
        <title>Canvas - Wrecking Ball</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styleSheet.css">
         
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
         
        <script>
            $(document).ready(function() {             
            var gravity = 9.8;
            var boxWidth = 595;
            var boxHeight = 450;
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');  
            var velocity = 0;
            var ticNumber = 10;
            var tics = 0;
            var dragFactor = .0004;
            var dragFlag = true;
            var prev=0;            
            
            var DestructionBall = function(bs, bm, x, y, vx, vy){
                    this.BallImg=new Image();
                    this.BallImg.src = "melon.png";
                    this.ballSize = bs;
                    this.ballMass = bm;
                    this.positionX = x; 
                    this.positionY = y; 
                    this.originX = x; //maintain the original position of the ball
                    this.originY = y; //maintain the original position of the ball
                    this.velocityX = vx;
                    this.velocityY = vy;      
                 };
            
            DestructionBall.prototype.draw = function(context, rPend, rBall){                
               
                context.beginPath();
                  context.arc(0, rPend, rBall, 0, Math.PI*2, false);
                  context.fillStyle = "blue";
                  context.fill();
                context.stroke();
                context.drawImage(this.BallImg,-rBall,-rBall+rPend, rBall*2, rBall*2);
                
            };                   
            
            var DestructionRig = function(topX, topY, cLength, cHeight, x, y, cIntTop, cIntRight, cLow, cabWS){ 
                    this.RigImg=new Image();
                    this.RigImg.src = "crane.png";
                  this.craneTopX = topX;  //top of crane
                  this.craneTopY = topY;  //top of crane
                  this.cabLength = cLength;
                  this.cabHeight = cHeight;
                  this.cabX = x; 
                  this.cabY = boxHeight-y; 
                  this.craneIntTop = cIntTop;  //top cab crane intersect at X point
                  this.craneIntRight = cIntRight;//right side cab crane intersect at Y point
                  this.craneLow = cLow;     //bottom intersect of crane
                  this.cabWindowSize = cabWS;                  
            };
            
            DestructionRig.prototype.draw = function(context, shade){    
                
                
                    context.drawImage(this.RigImg,5,95, 300, 350);
                
                //context.drawImage(this.RigImg,this.cabX,this.craneTopY, 300, 300);
                /*context.save();
                    context.lineWidth = 1;
                    context.strokeStyle = 'rgba(100,200,100,'+shade+')';
                    context.fillStyle = 'rgba(0,153,0,'+shade+')';
                    context.translate(this.cabX, this.cabY);
                    context.strokeRect(0,0, this.cabLength, this.cabHeight);
                    context.strokeRect(5,5,this.cabWindowSize, this.cabWindowSize);                    
                    context.beginPath();                                         
                        context.moveTo(this.craneIntTop, 0);
                        context.lineTo(this.craneTopX-this.cabX, this.craneTopY-this.cabY);
                        context.lineTo(this.cabLength, this.craneIntRight);  
                        context.lineTo(this.craneIntTop, this.craneLow);
                        context.lineTo(this.craneIntTop, 0);
                    context.closePath();                    
                    context.stroke();
                context.restore();*/
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
            };
            
            function traceArcPath (rig, context, shade, tics) {
                var arcArray = ["", "A", "", "B", "", "C", "", "D", "", "E", ""];
                var arcPercent = (tics/ticNumber)/2;
                var arcPathStart = Math.PI*0.5+(arcPercent*Math.PI);
                var arcPathFinish = arcPathStart - Math.PI*arcPercent;
                context.save();
                    context.lineWidth = 2;                    
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.setLineDash([5]);
                    context.beginPath();                        
                        context.arc(rig.craneTopX, rig.craneTopY, radiusOfLine, arcPathStart, arcPathFinish, true);                                                                 
                    context.stroke();                    
                context.restore();     
                
                context.save();
                    context.lineWidth = 25;                    
                    context.strokeStyle = 'rgba(50,50,50,'+shade+')';
                    arcPathStart = Math.PI;
                    arcPathFinish = Math.PI*.25;
                    context.beginPath();                        
                        context.arc(rig.craneTopX, rig.craneTopY, radiusOfLine+35, arcPathStart, arcPathFinish, true);                                                                 
                    context.stroke();                    
                context.restore();   
                
                //create tic marks
                var numDegrees = Math.PI/(ticNumber*2);
                var ticWidth = 4;
                var ticLength = ball.ballSize-6;                                              
                for (i=0; i<ticNumber+1; i++)
                {
                    if (arcArray[i]!="")
                    {
                        context.save();
                            context.lineWidth = ticWidth;                    
                            context.strokeStyle = 'rgba(0,0,0,1)';
                            context.translate(rig.craneTopX, rig.craneTopY);
                            context.rotate(numDegrees*i);
                            context.beginPath();
                                context.moveTo(0, radiusOfLine-ticLength/2);
                                context.lineTo(0, radiusOfLine+ticLength/2);                        
                            context.stroke();                                             
                            context.rotate(1/360*(Math.PI*2));
                            context.font = '12pt Calibri';
                            context.fillStyle = 'black';
                            context.fillText(arcArray[i], 0, radiusOfLine+ticLength+20);
                        context.restore();
                    }
                };
            };
            
            function init(){                                          
              context.save();  
                context.lineWidth = 10;
                context.strokeRect(5,5,boxWidth-5,boxHeight-5);
              context.restore();
              rig.draw(context, 1);                
            };
 
            function writeMessage(context, message) {                
                context.clearRect(100, 25, 380, 50);
                context.strokeRect(100, 25, 380, 50);
                context.font = '12pt Calibri';
                context.fillStyle = 'black';
                context.fillText(message, 100, 50);
              };

            
            
            function drawBuildings(context, destructionLevel)
            {
                context.save()
                    context.fillStyle = "rgba(132,31,39,1)"; 
                    context.globalCompositeOperation = "source-over";
                    //context.globalCompositeOperation = "destination-out";
                    context.translate(320, 250);
                    context.fillRect(0,0, 50, 195);
                    context.strokeStyle = "rgba(192,192,192,1)";
                    var bumpBrick = 0; 
                    for(var i=0; i<20; i++)
                    {
                        context.beginPath();     
                            context.moveTo(0, i*10);
                            context.lineTo(50, i*10);                            

                        if(i%2)
                            bumpBrick = 10;
                        else
                            bumpBrick=0;
                        
                        if (i<19)
                        {
                            context.moveTo(0, i*10);
                            context.lineTo(0, 10+i*10);

                            context.moveTo(10+bumpBrick, i*10);
                            context.lineTo(10+bumpBrick, 10+i*10);

                            context.moveTo(30+bumpBrick, i*10);
                            context.lineTo(30+bumpBrick, 10+i*10);

                            context.moveTo(50, i*10);
                            context.lineTo(50, 10+i*10);
                        }
                        else
                        {
                            context.moveTo(0, i*10);
                            context.lineTo(0, 5+i*10);

                            context.moveTo(10+bumpBrick, i*10);
                            context.lineTo(10+bumpBrick, 5+i*10);

                            context.moveTo(30+bumpBrick, i*10);
                            context.lineTo(30+bumpBrick, 5+i*10);

                            context.moveTo(50, i*10);
                            context.lineTo(50, 5+i*10);
                        }
                        

                        context.stroke();                                
                    };

                context.restore();
            };
            
            
            
            function drawScene(rig, ball, prev, angle, rPend, rBall, blur)
            {
                //context.fillStyle = "rgba(255,255,255,"+blur+")"; //defines fade out for motion blur
                context.fillStyle = "rgba(255,255,255,1)"; //defines fade out for motion blur
                context.globalCompositeOperation = "destination-out";
                context.fillRect(10, 75, boxWidth-15, boxHeight-80);
                if(wreckageFlag===1)
                    drawBuildings(context, 0);
                context.fillStyle = "black";
                context.strokeStyle = "rgba(0,0,0,"+Math.max(0,1-Math.abs(prev-angle)*10)+")";
                context.globalCompositeOperation = "source-over";
                //rig.draw(context, 1);   //draw the rig
                traceArcPath(rig, context, .50, tics); //drawtheArc
               
                context.save();
                  context.translate(rig.craneTopX, rig.craneTopY);
                  context.rotate(angle);
                  if(wreckageFlag===1)
                    connectRigBall (rig, ball, .80);   
                  ball.draw(context, rPend, rBall);
                context.restore();
                
            };
            
            function reportVelocity (velocity, maxVelocity, tics){                
                message1 = "          Speed:  "+ Math.abs(velocity).toFixed(2);                
                message2 = " Max Speed:  "+ maxVelocity.toFixed(2);
                context.save()
                    context.clearRect(100, 25, 380, 50);                
                    context.strokeRect(100, 25, 380, 50);       
                    context.font = '12pt Calibri';
                    context.fillStyle = 'black';                    
                    context.fillText(message1, 100, 40);                                
                    context.fillText(message2, 100, 60);                
                context.restore();
                if (tics>0)
                {
                    var velocityCell = tics+"v";                 
                    document.getElementById(velocityCell).textContent=maxVelocity.toFixed(2) ;
                }
                
            };
            
            function drawGraphPaper(context, linesH, linesV, numberArray, maxValue, yAxisText)
            {
                var graphHeight = boxHeight-150;
                var graphWidth = boxWidth-150;                
                var incrementH = graphHeight/linesH;
                var incrementV = graphWidth/linesV;                
                var valueIncrement = maxValue/linesH;
                var i;
                var xAxisText = "Wrecking Ball Level";

                //fill background
                context.save();     
                    context.fillStyle = 'lightblue';
                    context.fillRect(10,10,boxWidth-15, boxHeight-15);
                    context.strokeStyle= "rgba(0,0,0,.5)";
                context.restore();
                
                //axis labels
                context.save();
                    context.font = '12pt Calibri';
                    context.fillStyle = 'black'; 
                    context.textAlign = 'center';                    
                    //y-axis label
                    context.save();                
                        context.translate(40,(boxHeight-50)/2);
                        context.rotate(Math.PI*1.5);                    
                        context.fillText(yAxisText, 0, 0);
                    context.restore();
                    //x-axis label                
                    context.fillText(xAxisText, boxWidth/2+50, boxHeight-40);
                context.restore();
                
                //graph background lines and axis increment labels
                context.save();                    
                    for(i=0; i<linesH+1; i++)
                    {
                        //label data points on axes (0 to linesH)    
                        context.font = '12pt Calibri';
                        context.fillStyle = 'black';
                        context.textAlign = 'right';
                        context.strokeStyle = 'rgba(0,0,0,.4)';                                
                        context.fillText((maxValue-valueIncrement*i).toFixed(1), 90, 55+incrementH*i); //dependent 
                        context.fillText(i, 105+incrementV*i, graphHeight+70); //independent (level)
                        //draw background lines                                                                        
                        context.beginPath();
                        //horizontal lines
                            context.moveTo(100, 50+incrementH*i);
                            context.lineTo(graphWidth+100, 50+incrementH*i);
                        //vertical lines
                            context.moveTo(100+incrementV*i, 50);
                            context.lineTo(100+incrementV*i, graphHeight+50);
                        context.stroke();
                    }
                context.restore();
                
                //draw data points and data line
                context.save();                    
                    var pointSize = 5;
                    var xCoord = [];
                    var yCoord = [];                    
                    context.strokeStyle = 'rgba(0,0,0,.6)';
                    context.lineWidth = 1;                      
                    //draw connected line 
                    context.beginPath();
                    context.moveTo(100, graphHeight+50);
                    for(i=0; i<linesH+1; i++)
                    {                           
                        if (numberArray[i]!=null)
                        {
                            xCoord[i] = 100+incrementV*(i+1);
                            yCoord[i] = graphHeight+50-incrementH*(linesH/maxValue)*numberArray[i];                        
                            context.lineTo(xCoord[i], yCoord[i]); 
                        };
                    }
                    context.stroke();                    
                    //draw data points (1 to linesH)
                    context.font = '8pt Calibri';
                    context.textAlign = 'center';                        
                    for(i=0; i<linesH+1; i++)
                    {   
                        if(numberArray[i]!=null)
                        {                            
                            context.fillStyle = 'orange';                                
                            context.beginPath();
                            context.arc(xCoord[i], yCoord[i], pointSize, 0, Math.PI*2,false); 
                            context.closePath();
                            context.fill();
                            context.stroke();
                            context.fillStyle = 'black';              
                            var pointNotation = "["+(i+1).toString()+", "+numberArray[i].toString()+"]";
                            context.fillText(pointNotation, xCoord[i], yCoord[i]+pointSize+10);
                        };
                    }
                context.restore();
            }
            
            // smoothes animations for weak browsers
            // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
            // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

            // requestAnimationFrame polyfill by Erik Möller
            // fixes from Paul Irish and Tino Zijdel           
            (function() {
                var lastTime = 0;
                var vendors = ['ms', 'moz', 'webkit', 'o'];
                for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                               || window[vendors[x]+'CancelRequestAnimationFrame'];
                }

                if (!window.requestAnimationFrame)
                    window.requestAnimationFrame = function(callback, element) {
                        var currTime = new Date().getTime();
                        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                          timeToCall);
                        lastTime = currTime + timeToCall;
                        return id;
                    };

                if (!window.cancelAnimationFrame)
                    window.cancelAnimationFrame = function(id) {
                        clearTimeout(id);
                    };
            }());
            
            
            
            function drawPendulum(dFlag, k, time_now)
            {
                    if (time_now)
                    {
                        time_prev = time_now;
                        time_now = new Date().getTime();                         
                    }
                    else
                    {
                        time_now = new Date().getTime(); 
                        time_prev = time_now +1;                        
                    }                    
                    var time_delta = (time_now - time_prev)/1200;                    
                    var acceleration = k * Math.sin(angle);                    
                    velocity += acceleration * time_delta;                     
                    var drag = dragFactor * velocity * velocity;                    
                    if (dFlag){                        
                        if (velocity>0)
                            velocity -= drag;
                        else
                            velocity += drag;
                        };
                    angle    += velocity     * time_delta;                      
                                  
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, .85); 
                    var fudgeV = .006*tics*tics;
                    if((Math.abs(velocity)+fudgeV)>maxVelocity)
                        maxVelocity=Math.abs(velocity)+fudgeV;                
                    reportVelocity(velocity, maxVelocity, tics);
                    prev = angle;   
                    console.log("WreckFlag:"+wreckageFlag);
                    
                    var forceCell = tics+"f";      
                    
                    if(wreckageFlag===1)
                    {
                        console.log(" Angle:"+angle);
                        if (angle>0)
                            simPendulum = requestAnimationFrame(function () {                    
                                 drawPendulum(dFlag, k, time_now);                              
                             });
                        else
                        {
                            fudgeF = Math.abs(velocity) + fudgeV +.04*tics;
                            forceBall = (fudgeF*fudgeF*ball.ballMass)/10;
                            if (forceBall > maxForceBall) 
                            {
                                maxForceBall = forceBall;                                
                                document.getElementById(forceCell).textContent=maxForceBall.toFixed(2);                                
                            };
                            velocity = velocity*-0.45;
                            angle=0.0001;
                            simPendulum = requestAnimationFrame(function () {                    
                                 drawPendulum(dFlag, k, time_now);                              
                             });
                         }
                    }
                    else
                        simPendulum = requestAnimationFrame(function () {                    
                             drawPendulum(dFlag, k, time_now);                              
                         });
                         
            };
            
            //invokes drawPendulum
            function PendulumSim(length_m, gravity_mps2, tics, timestep_ms, dFlag) {                
                maxVelocity =0;       
                maxForceBall =0;
                var k = -gravity_mps2/length_m;
                var time_now = new Date().getTime();                 
                drawPendulum(dFlag, k, time_now);        
            };

            //******************INITIALIZING****************//
            var rig = new DestructionRig(300, 100, 100, 80, 50, 100, 65, 25, 45, 40);
            var ball = new DestructionBall(20, 5, 300, 350, 0, 0);            
            var radiusOfLine = ball.originY - rig.craneTopY;  
            var wreckageFlag=0;
            var velocityFlag=1;
            
            init();
            tics=document.getElementById('ticPicker').value;            
            angle = (Math.PI/2)*(tics/ticNumber);
            drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);  
            reportVelocity(0,0,0);

            var moveFlag = false;
            //start/stop the simulation
            function toggleMove(){
                if(moveFlag)
                {
                    //clearInterval(simPendulum);                        
                    cancelAnimationFrame(simPendulum);                        
                    angle = (Math.PI/2)*(tics/ticNumber);
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);                          
                    document.getElementById('ticMessage').style.color = 'black';
                    document.getElementById('startStop').textContent="Begin Simulation";
                    document.getElementById('dragCheck').disabled=false;
                    document.getElementById('clearTable').disabled=false;                     
                    document.getElementById('velocityGraph').disabled=false;
                    if(wreckageFlag===1)
                        document.getElementById('forceGraph').disabled=false;
                    document.getElementById('scenario3').disabled=false;
                    document.getElementById('scenario4').disabled=false;
                    $( "#ticPicker").removeAttr('disabled');
                    moveFlag = false;
                }
                else
                {
                    tics = document.getElementById('ticPicker').value;                    
                    document.getElementById('startStop').textContent="End Simulation";
                    document.getElementById('ticMessage').style.color = 'gray';                   
                    document.getElementById('dragCheck').disabled=true;                    
                    $( "#ticPicker").attr('disabled', 'disabled');
                    velocity=0;                       
                    var sim = PendulumSim(1, gravity, tics, 5, dragFlag);
                    document.getElementById('velocityGraph').disabled=true;                     
                    document.getElementById('forceGraph').disabled=true; 
                    document.getElementById('clearTable').disabled=true; 
                    document.getElementById('scenario3').disabled=true;
                    document.getElementById('scenario4').disabled=true;
                    moveFlag = true;                    
                };
            
            };
            
            function getTableValues (columnName, columnNumber){
                var valueArray = [];
                var index;
                var tableCellName;
                var cellContent;
                for (index=1; index<columnNumber+1; index++)
                {
                    tableCellName = index.toString()+columnName;                    
                    cellContent = document.getElementById(tableCellName).textContent;                    
                    if (cellContent==='--')
                        cellContent = null;
                    valueArray[index-1] = cellContent;                  
                };                
                return valueArray;                
            };
            
            //start/stop the simulation
            startStop.addEventListener('click', function(evt) {            
                toggleMove();
            }, false);
            
            function disableStuff()
            {                                  
                document.getElementById('startStop').disabled=true;
                document.getElementById('ticMessage').style.color = 'gray';                   
                document.getElementById('dragCheck').disabled=true;                    
                $( "#ticPicker").attr('disabled', 'disabled');                                        
                document.getElementById('clearTable').disabled=true;
                document.getElementById('velocityGraph').disabled=true;
                document.getElementById('forceGraph').disabled=true;
                document.getElementById('scenario3').disabled=true;
                document.getElementById('scenario4').disabled=true;
            };
            
            function enableStuff()
            {                
                document.getElementById('startStop').disabled=false;
                document.getElementById('ticMessage').style.color = 'black';                   
                document.getElementById('dragCheck').disabled=false;                    
                $( "#ticPicker").removeAttr('disabled');                                        
                document.getElementById('clearTable').disabled=false;  
                document.getElementById('velocityGraph').disabled=false;                
                if(wreckageFlag===1)
                    document.getElementById('forceGraph').disabled=false;
                document.getElementById('scenario3').disabled=false;
                document.getElementById('scenario4').disabled=false;
            };
            
            
            var graphFlag=false;            
            //draw velocity graph (disable a bunch of stuff)
            velocityGraph.addEventListener('click', function(evt) {            
                if(graphFlag)
                {
                    graphFlag=false;
                    context.clearRect(10,10,boxWidth-15, boxHeight-15);                   
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1); 
                    reportVelocity(0,0,0);
                    document.getElementById('velocityGraph').textContent="graph";                     
                    enableStuff();                                       
                }
                else
                {   
                    graphFlag=true;                 
                    var velocityTableValues = getTableValues("v", 10); //"v" for velocity, "f" for force, "r" for tic 
                    var maxVelocity = 5; //current Max, change this if v10>5
                    drawGraphPaper(context, 10, 10, velocityTableValues, maxVelocity, "Maximum Velocity m/s");
                    document.getElementById('velocityGraph').textContent="return to sim";   
                    disableStuff();
                    this.disabled=false
                };
            }, false);
            
            forceGraph.addEventListener('click', function(evt) {            
                if(graphFlag)
                {
                    graphFlag=false;
                    context.clearRect(10,10,boxWidth-15, boxHeight-15);                   
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1); 
                    reportVelocity(0,0,0);
                    document.getElementById('forceGraph').textContent="graph"; 
                    enableStuff();                                       
                }
                else
                {   
                    graphFlag=true;                 
                    var forceTableValues = getTableValues("f", 10); //"v" for velocity, "f" for force, "r" for tic 
                    var maxForce = 15; //current Max, change this if v10>5
                    drawGraphPaper(context, 10, 10, forceTableValues, maxForce, "Maximum Wreckage");
                    document.getElementById('forceGraph').textContent="return to sim"; 
                    disableStuff();
                    this.disabled=false
                };
            }, false);
            

            //change number of tics
            ticPicker.addEventListener('change', function(evt) {            
                tics=document.getElementById('ticPicker').value;            
                angle = (Math.PI/2)*(tics/ticNumber);
                drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);
            }, false);
           
            //drag ON/OFF
            dragCheck.addEventListener('change', function(evt) {            
                if (this.checked)                
                {
                    dragFlag = true;  
                    document.getElementById('dragLabel').innerHTML="Drag ON";   
                }
                else
                {
                    dragFlag = false;  
                    document.getElementById('dragLabel').innerHTML="Drag OFF";
                }
            }, false);
            
            //clear data table
            clearTable.addEventListener('click', function(evt) {            
                document.getElementById('velocityGraph').disabled=true;         
                for(i=1; i<11; i++)
                {
                    var velocityCell = i+"v";                    
                    var forceCell = i+"f";   
                    document.getElementById(velocityCell).textContent="--" ;
                    document.getElementById(forceCell).textContent="--" ;
                }
            }, false);
                      
            //velocity Sim
            scenario3.addEventListener('click', function(evt) {
                wreckageFlag=0;
                velocityFlag=1;
                tics=document.getElementById('ticPicker').value;            
                angle = (Math.PI/2)*(tics/ticNumber);
                drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);
            }, false);
            
            //wreckage Sim
            scenario4.addEventListener('click', function(evt) {
                wreckageFlag=1;
                velocityFlag=0;
                tics=document.getElementById('ticPicker').value;                            
                angle = (Math.PI/2)*(tics/ticNumber);
                drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);
            }, false);
            
            });
            
            
        </script>
    </head>
     
    <body>
        <div id="topTitle"><h2>Wrecking Ball Exercise and Simulation</h2></div>
        
        <div id="leftPane">
            <canvas id="myCanvas" width="600" height="475">
                <!-- Insert fallback content here -->
            </canvas>
            <div id="bottomPane">
                <button class ="progressButton" id="scenario1" disabled="true">1. Building: Too Little</button>
                <button class ="progressButton" id="scenario2" disabled="true">2. Building: Too Much</button>
                <button class ="progressButton" id="scenario3" >3. Simulation: Speed</button>
                <button class ="progressButton" id="scenario4" >4. Simulation: Wreckage</button>
                <button class ="progressButton" id="scenario5" disabled="true">5. Building: Just Right</button>
            </div>
        </div>
        
        <div id="rightPane">
                    
                <button id="startStop">Begin Simulation</button>
                <br>
                <text id="ticMessage">Choose starting value for wrecking ball</text>
                <select id="ticPicker" name="ticPicker">                   
                   <option value=1>1</option>
                   <option value=2>2</option>
                   <option value=3>3</option>
                   <option value=4>4</option>
                   <option value=5>5</option>
                   <option value=6>6</option>
                   <option value=7>7</option>
                   <option value=8>8</option>
                   <option value=9>9</option>
                   <option value=10>10</option>                    
                </select> 
                <br>
                <br>                
                <input type ="checkbox" id="dragCheck" checked><span id="dragLabel">Drag ON</span>
                <br>
                <br>
                <table id="ballData" style="width:100%">
                    <tr>
                        <th>Ball Level</th>
                        <th>Maximum Speed <button id="velocityGraph" disabled="true">graph</button></th>
                        <th>Wreckage Amount<button id="forceGraph" disabled="true">graph</button></th>
                      </tr>
                    <tr>
                      <td id="1r">1</td>
                      <td id="1v">--</td>
                      <td id="1f">--</td>
                    </tr>
                    <tr>
                      <td id="2r">2</td>
                      <td id="2v">--</td>
                      <td id="2f">--</td>
                    </tr>
                    <tr>
                      <td id="3r">3</td>
                      <td id="3v">--</td>
                      <td id="3f">--</td>
                    </tr>
                    <tr>
                      <td id="4r">4</td>
                      <td id="4v">--</td>
                      <td id="4f">--</td>
                    </tr>
                    <tr>
                      <td id="5r">5</td>
                      <td id="5v">--</td>
                      <td id="5f">--</td>
                    </tr>
                    <tr>
                      <td id="6r">6</td>
                      <td id="6v">--</td>
                      <td id="6f">--</td>
                    </tr>
                    <tr>
                      <td id="7r">7</td>
                      <td id="7v">--</td>
                      <td id="7f">--</td>
                    </tr>
                    <tr>
                      <td id="8r">8</td>
                      <td id="8v">--</td>
                      <td id="8f">--</td>
                    </tr>
                    <tr>
                      <td id="9r">9</td>
                      <td id="9v">--</td>
                      <td id="9f">--</td>
                    </tr>
                    <tr>
                      <td id="10r">10</td>
                      <td id="10v">--</td>
                      <td id="10f">--</td>
                    </tr>
                </table> 
                <button id="clearTable">Clear Table</button>
                
        
        </div>
    </body>
</html>
