/* 
 * Copyright CEISMC, 2015
 */

function drawScene(context, rig, ball, prev, angle, rPend, rBall, blur, boxWidth, boxHeight, wreckageFlag, radiusOfLine, shatterFlag, ticNumber, melonPieces, tics)
            {
                context.save();  
                    context.lineWidth = 10;
                    context.strokeRect(5,5,boxWidth-5,boxHeight-5);
                context.restore();
                context.fillStyle = "rgba(255,255,255,"+blur+")"; //defines fade out for motion blur
                //context.fillStyle = "rgba(255,255,255,1)"; //defines fade out for motion blur
                context.globalCompositeOperation = "destination-out";
                context.fillRect(10, 75, boxWidth-15, boxHeight-80);
                if(wreckageFlag===1)
                    drawWall(context);
                context.fillStyle = "black";
                context.strokeStyle = "rgba(0,0,0,"+Math.max(0,1-Math.abs(prev-angle)*10)+")";
                context.globalCompositeOperation = "source-over";
                //rig.draw(context, 1);   //draw the rig
                traceArcPath(rig, context, .50, tics, wreckageFlag, ticNumber, radiusOfLine, ball.ballSize); //drawtheArc
               
                context.save();
                  context.translate(rig.craneTopX, rig.craneTopY);
                  context.rotate(angle);
                  if(wreckageFlag===1)
                    connectRigBall (context, rig, ball, .80, radiusOfLine);   
                  ball.draw(context, rPend, rBall, wreckageFlag, shatterFlag);
                context.restore();
                
                for (i = 0; i < melonPieces.length; i++)
                    melonPieces[i].draw(context);
                    
                
            };
            
