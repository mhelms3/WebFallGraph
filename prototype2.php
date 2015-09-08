<!DOCTYPE html>
<!--
    Copyright CEISMC, Georiga Institute of Technology, 2015
    Code Author: Michael Helms, PhD
    Last Modified: April 15, 2015
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
            var gravity = 9.8;
            var boxWidth = 595;
            var boxHeight = 450;
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');  
            var velocity = 0;
            var ticNumber = 10;
            var tics = 0;
            var dragFactor = .0001;
            var dragFlag = true;
            var prev=0;            
            
            var DestructionBall = function(bs, bm, x, y, vx, vy){
                    this.ballSize = bs;
                    this.ballMass = bm;
                    this.positionX = x; 
                    this.positionY = y; 
                    this.originX = x; //maintain the original position of the ball
                    this.originY = y; //maintain the original position of the ball
                    this.velocityX = vx;
                    this.velocityY = vy;      
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
            
            var DestructionRig = function(topX, topY, cLength, cHeight, x, y, cIntTop, cIntRight, cLow, cabWS){             
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
                context.save();
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
            };
            
            function traceArcPath (rig, context, shade, tics) {
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
                //create tic marks
                
                var numDegrees = Math.PI/(ticNumber*2);
                var ticWidth = 4;
                var ticLength = ball.ballSize-6;                                              
                for (i=0; i<ticNumber+1; i++)
                {
                    context.save();
                        context.lineWidth = ticWidth;                    
                        context.strokeStyle = 'rgba(100,0,0,1)';
                        context.translate(rig.craneTopX, rig.craneTopY);
                        context.rotate(numDegrees*i);
                        context.beginPath();
                            context.moveTo(0, radiusOfLine-ticLength/2);
                            context.lineTo(0, radiusOfLine+ticLength/2);                        
                        context.stroke();                                             
                        context.rotate(1/360*(Math.PI*2));
                        context.font = '12pt Calibri';
                        context.fillStyle = 'black';
                        context.fillText(i, 0, radiusOfLine+ticLength+15);
                    context.restore();
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

            
            function drawScene(rig, ball, prev, angle, rPend, rBall, blur)
            {
                context.fillStyle = "rgba(255,255,255,"+blur+")"; //defines fade out for motion blur
                context.globalCompositeOperation = "destination-out";
                context.fillRect(10, 75, boxWidth-15, boxHeight-115);
                context.fillStyle = "yellow";
                context.strokeStyle = "rgba(0,0,0,"+Math.max(0,1-Math.abs(prev-angle)*10)+")";
                context.globalCompositeOperation = "source-over";
                rig.draw(context, 1);   //draw the rig
                traceArcPath(rig, context, .50, tics); //drawtheAc                
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
            
            function reportVelocity (velocity, maxVelocity, tics){                
                message1 = "          Velocity:  "+ (-velocity.toFixed(2));                
                message2 = " Max Velocity:  "+ maxVelocity.toFixed(2);
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
            
            function calcAngle(ball, angle)
            {                
                var ballX = Math.sin(angle) * rPend;
                var ballY = Math.cos(angle) * rPend;
                ball.positionX = ballX;
                ball.positionY = ballY;
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
                
                //var numberArray1 = [0.49, 0.97, 1.45, 1.92, 2.37, 2.80, 3.22, 3.61, 3.98, 4.32]; 
                var numberArray2 = [0.49, 0, 1.45, 1.92, 0, 2.80, 3.22, 3.61, 0, 4.32];
                
                //background lines
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
                            yCoord[i] = graphHeight+50-incrementH*2*numberArray[i];                        
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
            
            
            function PendulumSim(length_m, gravity_mps2, tics, timestep_ms, dFlag) {
                
                var maxVelocity =0;
                var angle = (Math.PI/2)*(tics/ticNumber);
                var k = -gravity_mps2/length_m;
                var timestep_s = timestep_ms /1200;                
                                  
                simPendulum = setInterval(function () {
                    var acceleration = k * Math.sin(angle);
                    velocity += acceleration * timestep_s; 
                    var drag = dragFactor * velocity * velocity;                    
                    if (dFlag){                        
                        if (velocity>0)
                            velocity -= drag;
                        else
                            velocity += drag;
                        };
                    angle    += velocity     * timestep_s;                   
                    var ballX = Math.sin(angle) * radiusOfLine;
                    var ballY = Math.cos(angle) * radiusOfLine;
                    ball.positionX = ballX;
                    ball.positionY = ballY;                  
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, .51);                
                    if(Math.abs(velocity)>maxVelocity)
                        maxVelocity=Math.abs(velocity);                
                    reportVelocity(velocity, maxVelocity, tics);
                    prev = angle;                                
                  }, timestep_ms);
                
              };

             var rig = new DestructionRig(300, 100, 100, 80, 50, 100, 65, 25, 45, 40);
             var ball = new DestructionBall(20, 5, 300, 350, 0, 0);            
             var radiusOfLine = ball.originY - rig.craneTopY;  
             init();
             tics=document.getElementById('ticPicker').value;            
             angle = (Math.PI/2)*(tics/ticNumber);
             drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);  
             reportVelocity(0,0,0);
            
             var moveFlag = false;
            function toggleMove(){
                if(moveFlag)
                {
                    clearInterval(simPendulum);                        
                    angle = (Math.PI/2)*(tics/ticNumber);
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);                          
                    document.getElementById('ticMessage').style.color = 'black';
                    document.getElementById('startStop').textContent="Begin Simulation";
                    document.getElementById('dragCheck').disabled=false;
                    document.getElementById('clearTable').disabled=false;                     
                    document.getElementById('velocityGraph').disabled=false;
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
                    document.getElementById('clearTable').disabled=true; 
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
            
            startStop.addEventListener('click', function(evt) {            
                toggleMove();
            }, false);
            
            var graphFlag=false;
            velocityGraph.addEventListener('click', function(evt) {            
                if(graphFlag)
                {
                    graphFlag=false;
                    context.clearRect(10,10,boxWidth-15, boxHeight-15);                   
                    drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1); 
                    reportVelocity(0,0,0);
                    document.getElementById('velocityGraph').textContent="graph"; 
                    
                    document.getElementById('startStop').disabled=false;
                    document.getElementById('ticMessage').style.color = 'black';                   
                    document.getElementById('dragCheck').disabled=false;                    
                    $( "#ticPicker").removeAttr('disabled');                                        
                    document.getElementById('clearTable').disabled=false; 
                    
                }
                else
                {   
                    graphFlag=true;                 
                    var velocityTableValues = getTableValues("v", 10); //"v" for velocity, "f" for force, "r" for tic 
                    var maxVelocity = 5; //current Max, change this if v10>5
                    drawGraphPaper(context, 10, 10, velocityTableValues, maxVelocity, "Maximum Velocity m/s");
                    document.getElementById('velocityGraph').textContent="return to sim"; 
                    
                    document.getElementById('startStop').disabled=true;
                    document.getElementById('ticMessage').style.color = 'gray';                   
                    document.getElementById('dragCheck').disabled=true;                    
                    $( "#ticPicker").attr('disabled', 'disabled');                                        
                    document.getElementById('clearTable').disabled=true; 
                };
            }, false);

            ticPicker.addEventListener('change', function(evt) {            
                tics=document.getElementById('ticPicker').value;            
                angle = (Math.PI/2)*(tics/ticNumber);
                drawScene(rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1);
            }, false);
           
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
            
            clearTable.addEventListener('click', function(evt) {            
                document.getElementById('velocityGraph').disabled=true;         
                for(i=1; i<11; i++)
                {
                    var velocityCell = i+"v";                    
                    document.getElementById(velocityCell).textContent="--" ;
                }
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
                <button class ="progressButton" id="scenario3" >3. Simulation: Velocity</button>
                <button class ="progressButton" id="scenario4" disabled="true">4. Simulation: Destruction</button>
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
                        <th>Maximum Velocity <button id="velocityGraph" disabled="true">graph</button></th>
                        <th>Destructo Units <button id="destructoGraph" disabled="true">graph</button></th>
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
