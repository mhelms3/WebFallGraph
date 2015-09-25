/* 
 * Copyright CEISMC, 2015
 */


 function traceArcPath (rig, context, shade, tics, noRampFlag, ticNumber, radiusOfLine, ballSize) {
                var arcArray = ["", "A", "B", "C", "D", "E"];
                var arcPercent = (tics/ticNumber)/2;
                var arcPathStart = Math.PI*0.5+(arcPercent*Math.PI);
                var arcPathFinish = arcPathStart - Math.PI*arcPercent;
                
                if(noRampFlag)
                {
                context.save();
                    context.lineWidth = 2;                    
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.setLineDash([5]);
                    context.beginPath();                        
                        context.arc(rig.craneTopX, rig.craneTopY, radiusOfLine, arcPathStart, arcPathFinish, true);                                                                 
                    context.stroke();                    
                context.restore();     
                }
                else
                {
                    context.save();
                        context.lineWidth = 24;                    
                        context.strokeStyle = 'rgba(50,50,50,'+shade+')';
                        arcPathStart = Math.PI;
                        arcPathFinish = Math.PI*.25;
                        context.beginPath();                        
                            context.arc(rig.craneTopX, rig.craneTopY, radiusOfLine+35, arcPathStart, arcPathFinish, true);                                                                 
                        context.stroke();                    
                        context.beginPath();                        
                            context.moveTo(rig.craneTopX-radiusOfLine-35, rig.craneTopY);
                            context.lineTo(rig.craneTopX-radiusOfLine-35, rig.craneTopY-30);    
                            context.moveTo(rig.craneTopX-9+(radiusOfLine+35)*Math.sin(arcPathFinish), rig.craneTopY+4+(radiusOfLine+35)*Math.cos(arcPathFinish));
                            context.lineTo(rig.craneTopX-9+(radiusOfLine+35)*Math.sin(arcPathFinish)+90, rig.craneTopY+4+(radiusOfLine+35)*Math.cos(arcPathFinish));    
                        context.stroke();                    
                    context.restore();   
                }
                
                //create tic marks
                var numDegrees = Math.PI/(ticNumber*2);
                var ticWidth = 4;
                var ticLength = ballSize-6;                                              
                for (i=0; i<ticNumber+1; i++)
                {
                    if (arcArray[i]!=="")
                    {
                        context.save();
                            context.lineWidth = ticWidth;                    
                            context.strokeStyle = 'rgba(0,0,0,1)';
                            context.translate(rig.craneTopX, rig.craneTopY);
                            context.rotate(numDegrees*i);
                            context.beginPath();
                                context.moveTo(0, radiusOfLine-ticLength/2);
                                context.lineTo(0, radiusOfLine+ticLength/2);                        
                            context.stroke();                                             
                            context.rotate(1/360*(Math.PI*2));
                            context.font = '12pt Calibri';
                            context.fillStyle = 'black';
                            context.fillText(arcArray[i], 0, radiusOfLine+ticLength+20);
                        context.restore();
                    }
                };
            };