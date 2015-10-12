/* 
 * Copyright CEISMC, 2015
 */

function enableButtons(context, rig, ball, myScreen, myFlags, myTimer, myPhysics, mySayings)
{
    
                  startStop.addEventListener('click', function(evt) {                                  
                        toggleMove(context, rig, ball, myScreen, myFlags, myTimer, myPhysics, mySayings);
                    }, false);
                    
                    
                     //change number of tics
                ticPicker.addEventListener('change', function(evt) {            
                    ball.tics=document.getElementById('ticPicker').value;            
                    ball.setTicAngle(rig.maxTicNumber);
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                }, false);

                //DRAG IS DISABLED
                /*
                dragCheck.addEventListener('change', function(evt) {            
                    if (this.checked)                
                    {
                       myFlags.dragFlag = true;  
                       document.getElementById('dragLabel').innerHTML="Drag ON";   
                    }
                    else
                    {
                        myFlags.dragFlag = false;  
                        document.getElementById('dragLabel').innerHTML="Drag OFF";
                    }
                }, false);
                */

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
                scenario1.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=false;
                    ball.tics=document.getElementById('ticPicker').value;            
                    ball.setTicAngle(rig.maxTicNumber);
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                }, false);

                //wreckage Sim
                scenario2.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=true;
                    ball.tics=document.getElementById('ticPicker').value;                            
                    ball.setTicAngle(rig.maxTicNumber);
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                }, false);

                myFlags.graphFlag=false;            
                //draw velocity graph (disable a bunch of stuff)

                velocityGraph.addEventListener('click', function(evt) {            
                    if(myFlags.graphFlag)
                    {
                        myFlags.graphFlag=false;
                        context.clearRect(10,10,myScreen.boxWidth-15, myScreen.boxHeight-15);                   
                        drawScene(context, rig, ball, 1, myScreen, myFlags);
                        reportVelocity(context, 0,0,0);
                        document.getElementById('velocityGraph').textContent="graph";                     
                        enableStuff(myFlags.wreckageFlag);                                       
                    }
                    else
                    {   
                        myFlags.graphFlag=true;                 
                        var velocityTableValues = getTableValues("v", 5); //"v" for velocity, "f" for force, "r" for tic 
                        var maxVelocity = 5; //current Max, change this if v10>5
                        drawGraphPaper(context, 5, 5, velocityTableValues, maxVelocity, "Maximum Velocity m/s", myScreen.boxHeight, myScreen.boxWidth);
                        document.getElementById('velocityGraph').textContent="return to sim";   
                        disableStuff();
                        this.disabled=false;
                    };
                }, false);

                forceGraph.addEventListener('click', function(evt) {            
                    if(myFlags.graphFlag)
                    {
                        myFlags.graphFlag=false;
                        context.clearRect(10,10,myScreen.boxWidth-15, myScreen.boxHeight-15);                   
                        drawScene(context, rig, ball, 1, myScreen, myFlags);
                        reportVelocity(context, 0,0,0);
                        document.getElementById('forceGraph').textContent="graph"; 
                        enableStuff(myFlags.wreckageFlag);                                       
                    }
                    else
                    {   
                        myFlags.graphFlag=true;                 
                        var forceTableValues = getTableValues("f", 5); //"v" for velocity, "f" for force, "r" for tic 
                        var maxForce = 15; //current Max, change this if v10>5
                        drawGraphPaper(context, 5, 5, forceTableValues, maxForce, "Pie Filling Amount",  myScreen.boxHeight, myScreen.boxWidth);
                        document.getElementById('forceGraph').textContent="return to sim"; 
                        disableStuff();
                        this.disabled=false;
                    };
                }, false);
    
};
