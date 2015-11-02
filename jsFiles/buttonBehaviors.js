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
                
                function clearColumn(column, rows)
                {
                    for(i=1; i<rows+1; i++)
                    {
                        var clearCell = i+column;                    
                        document.getElementById(clearCell).textContent="--" ;
                    }
                };
                
                helmetPicker.addEventListener('change', function(evt) {    
                    var forceFlag = false;
                    for(i=1; i<6; i++)
                    {
                        var forceCell = i+"h";   
                        if (document.getElementById(forceCell).textContent!="--")
                            forceFlag = true;
                    }
                    
                    if (forceFlag)
                    {
                        var confirmation = confirm("You will lose all helmet data when switching helmets. Proceed?");
                        if (confirmation)
                        {
                            clearColumn("h", 5);
                            ball.helmet=document.getElementById('helmetPicker').value;            
                            drawScene(context, rig, ball, 1, myScreen, myFlags);
                        }
                        else
                            document.getElementById('helmetPicker').selectedIndex = ball.helmet-1;
                        
                    }
                    
                    
                    //ball.helmet=document.getElementById('helmetPicker').value;            
                    //drawScene(context, rig, ball, 1, myScreen, myFlags);
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
                    document.getElementById('forceGraph').disabled=true;
                    clearColumn("v", 5);
                    clearColumn("f", 5);
                    clearColumn("h", 5);
                }, false);

                //velocity Sim
                scenario1.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=false;
                    myFlags.helmetFlag = false;
                    ball.tics=document.getElementById('ticPicker').value;            
                    ball.setTicAngle(rig.maxTicNumber);
                    ball.helmet = 0;
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                    document.getElementById('helmetMessage').style.visibility = "hidden";      
                    document.getElementById('helmetPicker').style.visibility = "hidden";
                    document.getElementById('helmetPicker').disabled=true;
                }, false);

                //wreckage Sim
                scenario2.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=true;
                    myFlags.helmetFlag = false;
                    ball.tics=document.getElementById('ticPicker').value;                            
                    ball.setTicAngle(rig.maxTicNumber);
                    ball.helmet = 0;
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                    document.getElementById('helmetMessage').style.visibility = "hidden";      
                    document.getElementById('helmetPicker').style.visibility = "hidden";
                    document.getElementById('helmetPicker').disabled=true;
                }, false);
                
                //helmet Sim
                scenario3.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=true;
                    myFlags.helmetFlag = true;
                    ball.tics=document.getElementById('ticPicker').value;                            
                    ball.setTicAngle(rig.maxTicNumber);
                    ball.helmet = document.getElementById('helmetPicker').value;
                    document.getElementById('helmetMessage').style.visibility = "visible";
                    document.getElementById('helmetPicker').style.visibility = "visible";
                    document.getElementById('helmetPicker').disabled=false;      
                    
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
