/* 
 * Copyright CEISMC, 2015
 */
function writeMessage(context, message) {                
                context.clearRect(100, 25, 380, 50);
                context.strokeRect(100, 25, 380, 50);
                context.font = '12pt Calibri';
                context.fillStyle = 'black';
                context.fillText(message, 100, 50);
            };
            
function skaterExpression (context, ball)
{       
    var textOffset = 125;
    context.save();
            //context.rotate(-ball.angle);        
            context.translate(textOffset+95, textOffset);
            context.font = '12pt Calibri';
            context.fillStyle = 'blue';
            context.fillText(ball.message, 0, 0);
   context.restore();
};
              
function activateButtons()
{
    $("[id^=scenario]").prop('disabled', true);  
    $("[id^=scenario1]").prop('disabled', false);  
    
}

function init(context, ball, rig, myScreen, myFlags, mySayings){                                          
                
                rig.radiusOfLine = ball.originY - rig.pivotY;  
                ball.tics=document.getElementById('ticPicker').value;            
                ball.setTicAngle(myFlags);
                
                myScreen.yArcEdge = rig.pivotY+4+(rig.radiusOfLine+35)*Math.cos(Math.PI*.25);
                myScreen.xArcEdge = rig.pivotX-9+(rig.radiusOfLine+35)*Math.sin(Math.PI*.25);
                
                mySayings.initializeSayings();
                
                document.getElementById('helmetMessage').style.visibility = "hidden";      
                document.getElementById('helmetPicker').style.visibility = "hidden";
                document.getElementById('helmetPicker').disabled=true;

                //drawScene(context, rig, ball, 1, myScreen, myFlags);
                initialScreen(context, myScreen);
                activateButtons();
                //reportVelocity(context, 0,0,0);
                
            };

function reportVelocity (context, velocity, maxVelocity, tics){                
                message1 = "          Speed:  "+ Math.abs(velocity).toFixed(2);                
                message2 = " Max Speed:  "+ maxVelocity.toFixed(2);
                context.save();
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
                    document.getElementById(velocityCell).textContent=maxVelocity.toFixed(2);
                }
                
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

function disableStuff()
            {                                  
                //document.getElementById('startStop').disabled=true;
                //document.getElementById('ticMessage').style.color = 'gray';                   
                //document.getElementById('dragCheck').disabled=true;   
                
                document.getElementById('startStop').textContent="End Simulation";
                $( "#ticPicker").attr('disabled', 'disabled');                                        
                $( "#helmetPicker").attr('disabled', 'disabled');      
                document.getElementById('clearTable').disabled=true;
                //document.getElementById('velocityGraph').disabled=true;
                //document.getElementById('forceGraph').disabled=true;
                
                document.getElementById('scenario1').disabled=true;
                document.getElementById('scenario2').disabled=true;
                document.getElementById('scenario3').disabled=true;
                document.getElementById('scenario4').disabled=true;
                document.getElementById('scenario5').disabled=true;
                
                document.getElementById('passcodeInput').disabled=true;
            };
            
function enableStuff(myFlags)
            {                
                //document.getElementById('startStop').disabled=false;
                //document.getElementById('ticMessage').style.color = 'black';                   
                //document.getElementById('dragCheck').disabled=false;    
                document.getElementById('startStop').textContent="Begin Simulation";
                $( "#ticPicker").removeAttr('disabled');   
                $( "#helmetPicker").removeAttr('disabled');   
                document.getElementById('clearTable').disabled=false;  
               //document.getElementById('velocityGraph').disabled=false;                
               // if(myFlags.wreckageFlag)
                    //document.getElementById('forceGraph').disabled=false;
                
                if(myFlags.passcode>0)
                    document.getElementById('scenario1').disabled=false;
                if(myFlags.passcode>1)
                    document.getElementById('scenario2').disabled=false;               
                if(myFlags.passcode>2)
                    document.getElementById('scenario3').disabled=false;  
                if(myFlags.passcode>3)
                    document.getElementById('scenario4').disabled=false;  
                if(myFlags.passcode>4)
                    document.getElementById('scenario5').disabled=false;  
                
                document.getElementById('passcodeInput').disabled=false;
            };

