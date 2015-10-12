/* 
 * Copyright CEISMC, 2015
 */

function drawScene(context, rig, ball, blur, screen, myFlags)
            {
                context.save();  
                    context.lineWidth = 10;
                    context.strokeRect(5,5,screen.boxWidth-5,screen.boxHeight-5);
                context.restore();
                
                context.fillStyle = "rgba(255,255,255,"+blur+")"; //defines fade out for motion blur
                context.globalCompositeOperation = "destination-out";
                context.fillRect(10, 10, screen.boxWidth-15, screen.boxHeight-15);
                
                
                
                if(myFlags.wreckageFlag)
                    drawWall(context);
                
                context.fillStyle = "black";
                context.globalCompositeOperation = "source-over";
                
                traceArcPath(context, ball, rig, .50, myFlags.wreckageFlag, screen); //drawtheArc
                
                context.save();
                    context.fillStyle = "rgba(255,255,0,1)"; 
                    context.translate(screen.xArcEdge, screen.yArcEdge);
                    context.fillRect(-1,-1,3,3);
                context.restore();
             
                //if(!myFlags.wreckageFlag)
                    //

             
                if (myFlags.arcFlag)
                {
                    context.save();
                      context.translate(rig.pivotX, rig.pivotY);
                      context.rotate(ball.angle);

                      if(myFlags.wreckageFlag)
                          rig.connectToMover(context, .80)

                      ball.draw(context, rig.radiusOfLine, myFlags);
                    context.restore();
                }
                else
                {
                    //console.log("Angle:" + ball.angle+" X.ball:" + ball.positionX + " Y.ball:"+ball.positionY);  
                    context.save();
                        context.translate(ball.positionX, ball.positionY);
                        context.rotate(ball.angle);
                        ball.draw(context, rig.radiusOfLine, myFlags);
                    context.restore();
                    //skaterExpression(context, "Cowabunga Little Dudes", ball);
                }
                
                if(ball.message !== "")
                        skaterExpression(context, ball);
                
                for (i = 0; i < ball.pieces.length; i++)
                    ball.pieces[i].draw(context);
            };
            
