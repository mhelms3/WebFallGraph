/* 
 * Copyright CEISMC, 2015
 */


function drawPendulum(mySayings, myScreen, myFlags, myPhysics, myTimer, ball, rig, context)
{
        myTimer.update();
        
        //if(!myFlags.wreckageFlag && myFlags.arcFlag)
        if(!myFlags.wreckageFlag)
            ball.checkArc(rig, myFlags, myScreen, mySayings);
        
        if(myFlags.arcFlag || !myFlags.trickFlag)
        {
            ball.update(myTimer, myPhysics, myFlags, myScreen, rig);
        }
        else
        {
            if(ball.velocityX!==0 && ball.velocityY!==0)
                ball.updateBallistic(context, rig, myTimer, myPhysics, myFlags, myScreen);
        }
        
        
        //THIS IS THE ONLY PLACE THE VALUE FOR BLUR SHOULD BE LESS THAN 1              
        drawScene(context, rig, ball, 1, myScreen, myFlags);

        //var fudgeV = .006*ball.tics*ball.tics;

        //if((Math.abs(ball.velocity)+fudgeV)>ball.maxVelocity)
        //    ball.maxVelocity=Math.abs(ball.velocity)+fudgeV;                
        if((Math.abs(ball.velocity))>ball.maxVelocity)
            ball.maxVelocity=Math.abs(ball.velocity);                
        reportVelocity(context, ball.velocity, ball.maxVelocity, ball.tics);
        ball.previousAngle = ball.angle;   
        //console.log("WreckFlag:"+wreckageFlag);

        var forceCell = ball.tics+"f";      
        var percentCell = ball.tics+"p";
        var percentDamaged;
        

        if(myFlags.wreckageFlag && ball.angle<0)
        {
                //fudgeF = Math.abs(ball.velocity) + fudgeV +.04*ball.tics;
                //forceBall = (fudgeF*fudgeF*ball.ballMass)/10;
                 
                var forceV = ball.velocity*ball.velocity; 
                forceBall = (forceV*ball.ballMass)/10;
                
                if (ball.helmet >0)
                {
                    forceBall -= (ball.helmet*.837)*(ball.ballMass/5);
                    if (forceBall < 0)
                        forceBall = 0.001;
                    forceCell = ball.tics+"h";
                }
                
                if (forceBall > ball.maxForceBall) 
                {
                    ball.maxForceBall = forceBall;
                    percentDamaged = ball.maxForceBall*7.4/(ball.ballMass/5);
                    if (myFlags.percentFlag)
                        document.getElementById(percentCell).textContent=Math.round(percentDamaged);                                
                    if (myFlags.sensorFlag)
                        document.getElementById(forceCell).textContent=ball.maxForceBall.toFixed(2);                                
                };
                myFlags.shatterFlag = true;
                ball.velocity = ball.velocity*-0.45;
                if (ball.pieces.length===0)
                    createMelonPieces(ball.maxForceBall/(ball.ballMass/5), ball.velocity, ball);
                ball.angle=0.001;
        }

        simPendulum = requestAnimationFrame(function () {                    
             drawPendulum(mySayings, myScreen, myFlags, myPhysics, myTimer, ball, rig, context);                              
        });
};
            
            //invokes drawPendulum
function pendulumSim(mySayings, myScreen, myFlags, myPhysics, myTimer, ball, rig, context) 
{      
    ball.maxVelocity =0;       
    ball.maxForceBall =0;
    myTimer.timeNow = new Date().getTime();                 
    drawPendulum(mySayings, myScreen, myFlags, myPhysics, myTimer, ball, rig, context);        
};

function toggleMove(context, rig, ball, myScreen, myFlags, myTimer, myPhysics, mySayings)
{
    if(myFlags.moveFlag)
    {
        cancelAnimationFrame(simPendulum);   
        myFlags.shatterFlag = false;
        ball.reset();        
        myFlags.arcFlag = true;
        ball.setTicAngle(rig.maxTicNumber);
        drawScene(context, rig, ball, 1, myScreen, myFlags);
        enableStuff(myFlags);     
        myFlags.moveFlag = false;
        myFlags.messageFlag = false;
    }
    else
    {
        ball.tics = document.getElementById('ticPicker').value;                    
        ball.velocity=0;                       
        pendulumSim(mySayings, myScreen, myFlags, myPhysics, myTimer, ball, rig, context);
        disableStuff();
        myFlags.moveFlag = true;                    
    }
};

           
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