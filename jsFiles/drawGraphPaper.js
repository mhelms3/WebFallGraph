/* 
 * Copyright CEISMC, 2015
 */
function drawGraphPaper(context, linesH, linesV, numberArray, maxValue, yAxisText, boxHeight, boxWidth)
            {
                var graphHeight = boxHeight-150;
                var graphWidth = boxWidth-150;                
                var incrementH = graphHeight/linesH;
                var incrementV = graphWidth/linesV;                
                var valueIncrement = maxValue/linesH;
                var i;
                var xAxisText = "Pumkin Level";

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
                        if (numberArray[i]!==null)
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
                   
                    var pointNotation;
                    for(i=0; i<linesH; i++)
                    {   
                        if(numberArray[i]!==null)
                        {                            
                            context.fillStyle = 'orange';                                
                            context.beginPath();
                            context.arc(xCoord[i], yCoord[i], pointSize, 0, Math.PI*2,false); 
                            context.closePath();
                            context.fill();
                            context.stroke();
                            context.fillStyle = 'black';              
                            pointNotation = "["+(i+1).toString()+", "+ numberArray[i].toString()+"]";
                            context.fillText(pointNotation, xCoord[i], yCoord[i]+pointSize+10);
                        };
                    }
                context.restore();
            }
            
            

