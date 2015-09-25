/* 
 * Copyright CEISMC, 2015
 */

$(window).load(function() {             
            var gravity = 9.8;
            var boxWidth = 595;
            var boxHeight = 450;
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');  
            var velocity = 0;
            var ticNumber = 5;
            var tics = 0;
            var dragFactor = .0004;
            var dragFlag = true;
            var prev=0;       
            var maxTime = 0;
            var totTime = 0;
            var numTime = 0;
            
            function init(){                                          
              context.save();  
                context.lineWidth = 10;
                context.strokeRect(5,5,boxWidth-5,boxHeight-5);
              context.restore();
              ball.draw(context, 1);                
            };
 
            
            /*
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
            });
            
           */
             
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
                    if(time_delta>.05)
                        time_delta = .014;
                    
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
                    
                    
                    if (melonPieces.length>0)
                    {
                        for (i=0; i<melonPieces.length; i++)
                        {   
                            melonPieces[i].updatePosition(k, time_delta, boxHeight);
                        }
                    }
                        
                                  
                    drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, .44, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces); 
                    var fudgeV = .006*tics*tics;
                    if((Math.abs(velocity)+fudgeV)>maxVelocity)
                        maxVelocity=Math.abs(velocity)+fudgeV;                
                    reportVelocity(context, velocity, maxVelocity, tics);
                    prev = angle;   
                    //console.log("WreckFlag:"+wreckageFlag);
                    
                    var forceCell = tics+"f";      
                    
                    if(wreckageFlag===1)
                    {
                        //console.log(" Angle:"+angle);
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
                            shatterFlag = true;
                            
                                
                            velocity = velocity*-0.45;
                            if (melonPieces.length===0)
                                createMelonPieces(maxForceBall, velocity, ball, melonPieces);
                            angle=0.001;
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
            var rig = new DestructionRig(310, 145, 100, 80, 50, 100, 65, 25, 45, 40, boxHeight);
            var ball = new DestructionBall(20, 5, 300, 395, 0, 0);            
            var radiusOfLine = ball.originY - rig.craneTopY;  
            var wreckageFlag=0;
            var shatterFlag = false;
            var velocityFlag=1;
            var melonPieces = [];
            
            init();
            tics=document.getElementById('ticPicker').value;            
            angle = (Math.PI/2)*(tics/ticNumber);
            drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics);  
            reportVelocity(context, 0,0,0);
            $("melonBoy2.png").load(function(){
                 ball.draw(context, rig.length, ball.ballSize, wreckageFlag, shatterFlag);   
             });
            

            var moveFlag = false;
            //start/stop the simulation
            function toggleMove(){
                if(moveFlag)
                {
                    //clearInterval(simPendulum);                        
                    cancelAnimationFrame(simPendulum);   
                    shatterFlag = false;
                    melonPieces = [];
                    angle = (Math.PI/2)*(tics/ticNumber);
                    drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics);                                                
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
                    drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics); 
                    reportVelocity(context, 0,0,0);
                    document.getElementById('velocityGraph').textContent="graph";                     
                    enableStuff();                                       
                }
                else
                {   
                    graphFlag=true;                 
                    var velocityTableValues = getTableValues("v", 5); //"v" for velocity, "f" for force, "r" for tic 
                    var maxVelocity = 5; //current Max, change this if v10>5
                    drawGraphPaper(context, 5, 5, velocityTableValues, maxVelocity, "Maximum Velocity m/s", boxHeight, boxWidth);
                    document.getElementById('velocityGraph').textContent="return to sim";   
                    disableStuff();
                    this.disabled=false;
                };
            }, false);
            
            forceGraph.addEventListener('click', function(evt) {            
                if(graphFlag)
                {
                    graphFlag=false;
                    context.clearRect(10,10,boxWidth-15, boxHeight-15);                   
                    drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics); 
                    reportVelocity(context, 0,0,0);
                    document.getElementById('forceGraph').textContent="graph"; 
                    enableStuff();                                       
                }
                else
                {   
                    graphFlag=true;                 
                    var forceTableValues = getTableValues("f", 5); //"v" for velocity, "f" for force, "r" for tic 
                    var maxForce = 15; //current Max, change this if v10>5
                    drawGraphPaper(context, 5, 5, forceTableValues, maxForce, "Pie Filling Amount",  boxHeight, boxWidth);
                    document.getElementById('forceGraph').textContent="return to sim"; 
                    disableStuff();
                    this.disabled=false;
                };
            }, false);
            

            //change number of tics
            ticPicker.addEventListener('change', function(evt) {            
                tics=document.getElementById('ticPicker').value;            
                angle = (Math.PI/2)*(tics/ticNumber);
                drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics);
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
                drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics);
            }, false);
            
            //wreckage Sim
            scenario4.addEventListener('click', function(evt) {
                wreckageFlag=1;
                velocityFlag=0;
                tics=document.getElementById('ticPicker').value;                            
                angle = (Math.PI/2)*(tics/ticNumber);
                drawScene(context, rig, ball, prev, angle, radiusOfLine, ball.ballSize, 1, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics);
            }, false);
            
            });
            
                       
       

