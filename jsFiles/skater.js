var DestructionBall = function(bs, bm, x, y, vx, vy){
                    this.BallImg=new Image();                    
                    this.BallImg.src = "gourd.png";
                    this.BallImgD1=new Image();                    
                    this.BallImgD1.src = "gourdD1.png";
                    this.BallImgD2=new Image();                    
                    this.BallImgD2.src = "gourdD2.png";
                    this.BallImgD3=new Image();                    
                    this.BallImgD3.src = "gourdD3.png";
                    this.BallImgD4=new Image();                    
                    this.BallImgD4.src = "gourdD4.png";
                    this.BallImgD5=new Image();                    
                    this.BallImgD5.src = "gourdD5.png";
                    this.SkaterImg=new Image();
                    this.SkaterImg.src = "gourdon.png";
                    this.ballSize = bs;
                    this.ballMass = bm;
                    this.positionX = x; 
                    this.positionY = y; 
                    this.originX = x; //maintain the original position of the ball
                    this.originY = y; //maintain the original position of the ball
                    this.velocityX = vx;
                    this.velocityY = vy;      
                 };
            
            DestructionBall.prototype.draw = function(context, rPend, rBall, pumpkinFlag, sFlag){                

                    if (pumpkinFlag)
                     if(sFlag)
                    {
                        if (maxForceBall<.5)
                            context.drawImage(this.BallImg,-rBall,-rBall+rPend, rBall*2, rBall*2);                           
                        else if(maxForceBall<2)
                            context.drawImage(this.BallImgD1,-rBall,-rBall+rPend, rBall*2, rBall*2);
                        else if(maxForceBall<4)
                            context.drawImage(this.BallImgD2,-rBall,-rBall+rPend, rBall*2, rBall*2);
                        else if(maxForceBall<7)
                            context.drawImage(this.BallImgD3,-rBall,-rBall+rPend, rBall*2, rBall*2);
                        else if(maxForceBall<10)
                            context.drawImage(this.BallImgD4,-rBall,-rBall+rPend, rBall*2, rBall*2);
                        else 
                            context.drawImage(this.BallImgD5,-rBall,-rBall+rPend, rBall*2, rBall*2);
                    }
                    else
                        context.drawImage(this.BallImg,-rBall,-rBall+rPend, rBall*2, rBall*2);
                else                   
                    context.drawImage(this.SkaterImg,-rBall*3+20,-rBall*5+rPend+3, rBall*4, rBall*6);
                
            };       
            
            var MelonPiece = function(x, y, vx, vy, size, rotation)
            {
                    this.positionX = x; 
                    this.positionY = y; 
                    this.velocityX = vx;
                    this.velocityY = vy;   
                    this.size = size;   
                    this.rotationAngle = rotation;
                    this.PieceImg=new Image();                    
                    this.PieceImg.src = "gourdPie2.png";                    
                    //console.log("Instance position:" + this.positionX + " " + this.positionY + "rot" + this.rotationAngle);
            };
            
            MelonPiece.prototype.updatePosition = function(k, time_delta, maxHeight){
                //console.log("Updated position:" + this.positionX + " " + this.positionY);
                if (this.positionY < (maxHeight-23))
                {
                    this.velocityY += k*time_delta;
                    this.positionY -= this.velocityY ;
                    this.positionX -= this.velocityX ;
                    this.rotationAngle += (this.velocityX/45) * Math.PI;
                    //console.log("Updated velocity:" + " vX" + this.velocityX + " vY" + this.velocityY);        
                    //console.log("Updated position:" + k + " " + time_delta + " X " + this.positionX + " Y " + this.positionY);
                    
                }
            };
            
             MelonPiece.prototype.draw = function(context){
                //console.log("Draw position:" + this.positionX + " " + this.positionY);
                var sizeI = 16;
                //sizeI = sizeI.toInt;
                context.save();
                    context.translate(this.positionX+8, this.positionY+8);
                    context.rotate(this.rotationAngle);
                    context.drawImage(this.PieceImg, -8,-8, sizeI, sizeI);               
                context.restore();
            };
            
             function createMelonPieces (forceSize, vx, ball, melonPieces)
            {
                if (forceSize > 1)
                { 
                    for (i=0; i<forceSize; i=i+.75)
                    {
                  
                        var vy = Math.random()*4*vx;
                        var vxSign = Math.random();
                        if (vxSign > .50)
                            vx = -vx;
                        
                        var randSize = Math.random() +.25;
                        var randRotation = (Math.random() * 2 * Math.PI) - Math.PI;
                        //console.log("R" + randRotation);
                        var mp1 = new MelonPiece(ball.positionX, ball.positionY, vx, vy, randSize, randRotation);
                        var mp2 = new MelonPiece(ball.positionX, ball.positionY, vx, -vy, randSize, -randRotation);
                        melonPieces.push(mp1);
                        melonPieces.push(mp2);
                        
                    }
                }
            }