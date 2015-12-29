/* 
 * Copyright CEISMC, 2015
 */


 function traceArcPath (context, ball, rig, shade, myFlags, myScreen) {
                var arcArray = ["", "A", "B", "C", "D", "E"];
               
     
                var arcPercent = (ball.startingAngle/(Math.PI/2))/2;
                //var arcPercent = (ball.tics/rig.maxTicNumber)/2; ///FIX THIS!!!!
                
                
                
                var arcPathStart = Math.PI*0.5+(arcPercent*Math.PI);
                var arcPathFinish = arcPathStart - Math.PI*arcPercent;
                
                if(myFlags.wreckageFlag)
                {
                context.save();
                    context.lineWidth = 2;                    
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.setLineDash([5]);
                    context.beginPath();                        
                        context.arc(rig.pivotX, rig.pivotY, rig.radiusOfLine, arcPathStart, arcPathFinish, true);                                                                 
                    context.stroke();                    
                context.restore();     
                }
                /*
                else
                {
                    context.save();
                        context.lineWidth = 24;                    
                        context.strokeStyle = 'rgba(50,50,50,'+shade+')';
                        arcPathStart = Math.PI;
                        arcPathFinish = Math.PI*.25;
                        context.beginPath();                        
                            context.arc(rig.pivotX, rig.pivotY, rig.radiusOfLine+35, arcPathStart, arcPathFinish, true);                                                                 
                        context.stroke();                    
                        context.beginPath();                        
                            context.moveTo(rig.pivotX-rig.radiusOfLine-35, rig.pivotY);
                            context.lineTo(rig.pivotX-rig.radiusOfLine-35, rig.pivotY-30);    
                            //context.moveTo(rig.pivotX-9+(rig.radiusOfLine+35)*Math.sin(arcPathFinish), rig.pivotY+4+(rig.radiusOfLine+35)*Math.cos(arcPathFinish));
                            //context.lineTo(rig.pivotX-9+(rig.radiusOfLine+35)*Math.sin(arcPathFinish)+90, rig.pivotY+4+(rig.radiusOfLine+35)*Math.cos(arcPathFinish)); 
                            context.moveTo(myScreen.xArcEdge, myScreen.yArcEdge);
                            context.lineTo(myScreen.boxWidth-5, myScreen.yArcEdge);    
                        context.stroke();                    
                    context.restore();   
                }
                */
                
                //create tic marks
                var numDegrees = Math.PI/(rig.maxTicNumber*2);
                var ticWidth = 4;
                var ticLength = ball.ballSize-6;                                              
                if(!myFlags.displayAltFlag)
                {
                    for (i=0; i<rig.maxTicNumber+1; i++)
                    {
                        if (arcArray[i]!=="")
                        {
                            context.save();
                                context.lineWidth = ticWidth;                    
                                context.strokeStyle = 'rgba(255,255,0,1)';
                                context.translate(rig.pivotX, rig.pivotY);
                                context.rotate(numDegrees*i);
                                context.beginPath();
                                    context.moveTo(0, rig.radiusOfLine-ticLength/2);
                                    context.lineTo(0, rig.radiusOfLine+ticLength/2);                        
                                context.stroke();                                             
                                context.rotate(1/360*(Math.PI*2));
                                context.font = '16pt Calibri';
                                context.fillStyle = 'yellow';
                                context.fillText(arcArray[i], 0, rig.radiusOfLine+ticLength+20);
                            context.restore();
                        }
                    }
                }
                else
                {
                    context.save();
                                context.lineWidth = ticWidth;                    
                                context.strokeStyle = 'rgba(255,255,0,1)';
                                context.translate(rig.pivotX, rig.pivotY);
                                context.rotate(ball.startingAngle);
                                context.beginPath();
                                    context.moveTo(0, rig.radiusOfLine-ticLength/2);
                                    context.lineTo(0, rig.radiusOfLine+ticLength/2);                        
                                context.stroke();                                             
                                context.font = 'bold 16pt Calibri';
                                context.fillStyle = 'yellow';
                                context.rotate(-ball.startingAngle);
                                var calcx = -rig.radiusOfLine*(Math.sin(ball.startingAngle))-50;
                                var calcy = rig.radiusOfLine*(Math.cos(ball.startingAngle)-1);
                                context.translate(calcx, calcy);
                                context.fillText(myScreen.altLabel, 0, rig.radiusOfLine+ticLength+20);
                    context.restore();
                }
            };