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
                    ball.setTicAngle(myFlags);
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                }, false);
                
                parkPicker.addEventListener('change', function(evt) {            
                    ball.tics=document.getElementById('parkPicker').value;            
                    ball.setTicAngle(myFlags);
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
                    else
                    {
                         ball.helmet=document.getElementById('helmetPicker').value;            
                         drawScene(context, rig, ball, 1, myScreen, myFlags);
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
                    clearColumn("p", 5);
                }, false);
                
                function checkPasscode(n)
                {
                    if (n>myFlags.passcode)
                    {
                        myFlags.passcode = n;
                        console.log(myFlags.passcode);
                        enableStuff(myFlags);
                    }
                    document.getElementById('passcodeInput').style.color = "green";  
                };

                function checkVisible()
                {
                    if (myFlags.hiddenControlsFlag)
                    {
                        document.getElementById('rightPane').style.display = "block";  
                        myFlags.hiddenControlsFlag = false;
                    } 
                    
                    if (myFlags.displayAltFlag)
                    {
                        document.getElementById('ticPickerSpan').style.display = "none";
                        document.getElementById('parkPickerSpan').style.display = "block";
                        document.getElementById('mainTable').style.display = "none";
                        document.getElementById('altTable').style.display = "block";
                    }
                    else
                    {
                        document.getElementById('ticPickerSpan').style.display = "block";
                        document.getElementById('parkPickerSpan').style.display = "none";
                        document.getElementById('mainTable').style.display = "block";
                        document.getElementById('altTable').style.display = "none";
                    }
                    
                    if (ball.helmet == 0)
                    {
                        document.getElementById('helmetMessage').style.visibility = "hidden";      
                        document.getElementById('helmetPicker').style.visibility = "hidden";
                        document.getElementById('helmetPicker').disabled=true;
                    }
                    else
                    {
                        document.getElementById('helmetMessage').style.visibility = "visible";
                        document.getElementById('helmetPicker').style.visibility = "visible";
                        document.getElementById('helmetPicker').disabled=false;    
                    }
                };
                
                
                
                passcodeInput.addEventListener('click', function(evt) {
                    this.value = "";
                    this.style.color = "blue";
                }, false);
                
                passcodeInput.addEventListener('keyup', function(evt) {
                    var inputString = this.value;
                    console.log(inputString);
                    switch (inputString) {
                    case "two":
                        checkPasscode(2);
                        this.style.color = "green";
                        break;
                    case "three":
                        checkPasscode(3);
                        break;
                    case "four":
                        checkPasscode(4);
                        break;
                    case "five":
                        checkPasscode(5);
                        break;
                    default:
                        this.style.color = "blue";  
                    }
                }, false);
                
                //velocity Sim
                scenario1.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=false;
                    myFlags.percentFlag=false;
                    myFlags.sensorFlag=false;
                    myFlags.helmetFlag = false;
                    myFlags.displayAltFlag = false;
                    ball.tics=document.getElementById('ticPicker').value;            
                    ball.setTicAngle(myFlags);
                    ball.helmet = 0;
                    checkVisible();
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                   
                }, false);

                //wreckage Sim
                 scenario2.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=true;
                    myFlags.percentFlag=true;
                    myFlags.sensorFlag=false;
                    myFlags.helmetFlag = false;
                    myFlags.displayAltFlag = false;
                    ball.tics=document.getElementById('ticPicker').value;                            
                    ball.setTicAngle(myFlags);
                    ball.helmet = 0;
                    checkVisible();
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                    
                }, false);
                
                scenario3.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=true;
                    myFlags.percentFlag=false;
                    myFlags.sensorFlag=true;
                    myFlags.helmetFlag = false;
                    myFlags.displayAltFlag = false;
                    ball.tics=document.getElementById('ticPicker').value;                            
                    ball.setTicAngle(myFlags);
                    ball.helmet = 0;
                    checkVisible();
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                    
                }, false);
                
                //helmet Sim
                scenario4.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag=true;
                    myFlags.percentFlag=false;
                    myFlags.sensorFlag=true;                    
                    myFlags.helmetFlag = true;
                    myFlags.displayAltFlag = false;
                    ball.tics=document.getElementById('ticPicker').value;                            
                    ball.setTicAngle(myFlags);
                    ball.helmet = document.getElementById('helmetPicker').value;
                    checkVisible();
                    drawScene(context, rig, ball, 1, myScreen, myFlags);
                }, false);
                
                
                 scenario5.addEventListener('click', function(evt) {
                    myFlags.wreckageFlag = true;
                    myFlags.percentFlag = false;
                    myFlags.sensorFlag = true;                    
                    myFlags.helmetFlag = false;
                    myFlags.displayAltFlag = true;
                    ball.tics=document.getElementById('parkPicker').value;                            
                    ball.setTicAngle(myFlags);
                    ball.helmet = 0;
                    checkVisible();
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
                        enableStuff(myFlags);                                       
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
                        enableStuff(myFlags);                                       
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
