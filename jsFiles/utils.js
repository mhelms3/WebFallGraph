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
                    document.getElementById(velocityCell).textContent=maxVelocity.toFixed(2) ;
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