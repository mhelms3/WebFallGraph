/* 
 * Copyright CEISMC, 2015
 */
function drawWall(context, screen)
            {
                context.save();
                    context.fillStyle = "rgba(132,31,39,1)"; 
                    context.globalCompositeOperation = "source-over";
                    //context.globalCompositeOperation = "destination-out";
                    context.translate(320, 250);
                    context.fillRect(0,0, 50, 195);
                    context.strokeStyle = "rgba(192,192,192,1)";
                    context.drawImage(screen.wallImage,0, 0, 50, 195);  
                context.restore();
            };
            
function drawBackground(context, screen, imageNumber)
{
    context.save();
        context.drawImage(screen.backGroundImage[imageNumber], 10, 10, screen.boxWidth-15, screen.boxHeight-15);  
    context.restore();
}
function initialScreen (context, screen)
{
    var logoImage = new Image();
    logoImage.src = "imageFiles/logoImage.png";
   
  
       context.save();  
          context.lineWidth = 10;
          context.strokeRect(5,5,screen.boxWidth-5,screen.boxHeight-5);
          //context.fillStyle = "rgba(0,0,255,1)";
          context.fillStyle = "rgba(207,181,59,1)";
          context.fillRect(10, 10, screen.boxWidth-15, screen.boxHeight-15);
          logoImage.addEventListener("load", function() {
            context.drawImage(logoImage, 240, 100, 200, 100);      
          }, false);
          
          
          context.font = '12pt Calibri';
          context.fillStyle = 'white';
          context.fillText("Welcome to the Helmet Challenge", 200, 350);
          context.fillText("brought to you by CEISMC at Georgia Tech", 200, 365);
          context.fillText("Click on a button below to begin.", 200, 390);
          context.fillStyle = 'blue';
          
         
    context.restore();
    
   
 }

function drawScene(context, rig, ball, blur, screen, myFlags)
            {
                context.save();  
                    context.lineWidth = 10;
                    context.strokeRect(5,5,screen.boxWidth-5,screen.boxHeight-5);
                context.restore();
                
                context.fillStyle = "rgba(255,255,255,"+blur+")"; //defines fade out for motion blur
               // context.globalCompositeOperation = "destination-out";
                
                if(myFlags.wreckageFlag)
                    drawBackground(context, screen, 0);
                else
                    drawBackground(context, screen, 2);
                    //context.fillRect(10, 10, screen.boxWidth-15, screen.boxHeight-15);
                
                if(myFlags.wreckageFlag)
                    drawWall(context, screen);
                    
                
                context.fillStyle = "black";
                context.globalCompositeOperation = "source-over";
                
                traceArcPath(context, ball, rig, .50, myFlags, screen); //drawtheArc
                
                /*context.save();
                    context.fillStyle = "rgba(255,255,0,1)"; 
                    context.translate(screen.xArcEdge, screen.yArcEdge);
                    context.fillRect(-1,-1,3,3);
                context.restore();
               */
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
                {
                        skaterExpression(context, ball);
                        myFlags.messageFlag = true;
                }
                
                for (i = 0; i < ball.pieces.length; i++)
                    ball.pieces[i].draw(context);
                
                if (myFlags.sensorFlag)
                {
                    context.drawImage(ball.crashImage, 480, 20, 60, 60);
                    writeMessage(context, "                                ENERGY SENSOR IS ACTIVE");
                }
            };
            
