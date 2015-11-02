var moveObject = function(bs, bm, x, y, vx, vy)
{
                    this.moverImages = [];
                    this.helmetImages = [];
                    this.skaterImages = [];
                    
                    this.ballSize = bs;
                    this.ballMass = bm;
                    this.positionX = x; 
                    this.positionY = y; 
                    this.originX = x; //maintain the original position of the ball
                    this.originY = y; //maintain the original position of the ball
                    this.velocityX = vx;
                    this.velocityY = vy;  
                    this.velocity = 0;
                    this.maxVelocity = 0;
                    this.maxForceBall = 0;
                    this.acceleration = 0;
                    this.drag = 0;
                    this.angle = 0;  
                    this.previousAngle = 0;
                    this.tics = 0;
                    this.pieces = [];
                    this.message = "";
                    this.helmet = 0;
                    
                    this.getImages(6, "gourd", this.moverImages);
                    this.getImages(4, "helmet", this.helmetImages);
                    this.getImages(4, "skater", this.skaterImages);
                 };
                 
                 
            moveObject.prototype.getImages = function(numImages, baseName, imageVar )
            {
                var fileNameImage;
                for (i = 0; i<numImages; i++)
                {
                    imageVar[i] = new Image();
                    fileNameImage = "imageFiles/"+ baseName + i.toString() + ".png";
                    imageVar[i].src = fileNameImage;
                }
            };    
            
            moveObject.prototype.reset = function()
            {                
                this.pieces = [];
                this.velocity = 0;
                this.maxVelocity = 0;
                this.maxForceBall = 0;
                this.acceleration = 0;
                this.drag = 0;
                this.angle = 0;  
                this.previousAngle = 0;
                this.positionX = this.originX;
                this.positionY = this.originY;
                this.message = "";
            };
            
            moveObject.prototype.draw = function(context, rPend, myFlags)
            {                
                    var rBall = this.ballSize;
                    var dimX;
                    var dimY;
                    var posX;
                    var posY;
                    
                    if (myFlags.wreckageFlag)
                    {
                        //draw pumpkin
                        dimX = rBall*2;
                        dimY = rBall*2;
                        posX = -rBall;
                        posY = -rBall+rPend;
                        if(myFlags.shatterFlag)
                            {
                                if (this.maxForceBall<.5)
                                    context.drawImage(this.moverImages[0],posX, posY, dimX, dimY);                           
                                else if(this.maxForceBall<2)
                                    context.drawImage(this.moverImages[1],posX, posY, dimX, dimY);
                                else if(this.maxForceBall<4)
                                    context.drawImage(this.moverImages[2],posX, posY, dimX, dimY);
                                else if(this.maxForceBall<7)
                                    context.drawImage(this.moverImages[3],posX, posY, dimX, dimY);
                                else if(this.maxForceBall<10)
                                    context.drawImage(this.moverImages[4],posX, posY, dimX, dimY);
                                else 
                                    context.drawImage(this.moverImages[5],posX, posY, dimX, dimY);
                            }
                        else
                            context.drawImage(this.moverImages[0],posX, posY, dimX, dimY);
                        
                        //draw helmet
                        dimX = rBall*2+4;
                        dimY = rBall*2+4;
                        posX = -rBall-2;
                        posY = -rBall+rPend-2;
                        if(myFlags.helmetFlag)
                        {
                            if (this.helmet == 1)
                                context.drawImage(this.helmetImages[0],posX, posY, dimX, dimY);                          
                            else if (this.helmet == 2)
                                context.drawImage(this.helmetImages[1],posX, posY, dimX, dimY);                           
                            else if (this.helmet == 3)
                                context.drawImage(this.helmetImages[2],posX, posY, dimX, dimY);  
                            else if (this.helmet == 4)
                                context.drawImage(this.helmetImages[3],posX, posY, dimX, dimY);  
                            else 
                                context.drawImage(this.helmetImages[0],posX, posY, dimX, dimY);                           
                        }
                    }
                    else         
                    {
                        //draw skater
                        dimX = rBall*5;
                        dimY = rBall*6;
                        
                        if(!myFlags.arcFlag)
                        {
                            posX = -rBall*3+20;
                            posY = -rBall*5+3;
                            if(this.angle<-.95)
                                context.drawImage(this.skaterImages[3],posX, posY, dimX, dimY);
                            else if(this.angle<-.45)
                                context.drawImage(this.skaterImages[2], posX, posY, dimX, dimY);
                            else
                                context.drawImage(this.skaterImages[0], posX, posY, dimX, dimY);
                        }
                        else
                        {
                            posX = -rBall*3+20;
                            posY = -rBall*5+3+rPend;
                            if(this.velocity>0)
                                context.drawImage(this.skaterImages[1],posX, posY, dimX, dimY);
                            else
                                context.drawImage(this.skaterImages[0],posX, posY, dimX, dimY);
                        }
                    }
  
            };       
            
            moveObject.prototype.setTicAngle = function(maxTicNumber) 
            {
                this.angle = (Math.PI/2)*(this.tics/maxTicNumber);
            };
            
            moveObject.prototype.update = function(myTimer, myPhysics, myFlags, myScreen, rig) 
            {
                    this.acceleration = -myPhysics.gravity * Math.sin(this.angle);                    
                    this.velocity += this.acceleration * myTimer.timeDelta;                     
                    /* DRAG IS OFF
                    this.drag = myPhysics.dragFactor * this.velocity * this.velocity;                    
                    if (myFlags.dragFlag){                        
                        if (this.velocity>0)
                            this.velocity -= this.drag;
                        else
                            this.velocity += this.drag;
                        };
                    */
                    this.angle += this.velocity * myTimer.timeDelta; 
                    
                    this.velocityY = this.velocity * Math.cos(this.angle);
                    this.velocityX = this.velocity * Math.sin(this.angle);
                    
                   
                    this.positionX = rig.pivotX - rig.radiusOfLine*Math.sin(this.angle);
                    this.positionY = rig.pivotY + rig.radiusOfLine*Math.cos(this.angle);

                    if (this.pieces.length>0)
                    {
                        for (i=0; i<this.pieces.length; i++)
                        {   
                            this.pieces[i].updatePosition(myPhysics, myTimer.timeDelta, myScreen.boxHeight);
                        }
                    };
            };
            
            moveObject.prototype.getMessage = function(mySayings)
            {
                var tempSayings;
                if(this.positionY > 360) 
                    tempSayings = mySayings.lameSayings;
                else if(this.positionY > 300) 
                    tempSayings = mySayings.goodSayings;
                else if(this.positionY > 200) 
                    tempSayings = mySayings.awesomeSayings;
                else
                    tempSayings = mySayings.dizzySayings;
                
                var sayIndex = Math.floor(Math.random() * tempSayings.length);
                this.message = tempSayings[sayIndex];
                
                //console.log("Y:"+ this.positionY+" Message:"+this.message);
                
            };
            
            moveObject.prototype.checkArc = function(rig, myFlags, myScreen, mySayings)
            {
                /*var xEdge = rig.pivotX-9+(rig.radiusOfLine+35)*Math.sin(Math.PI*.25);
                var yEdge = rig.pivotY+4+(rig.radiusOfLine+35)*Math.cos(Math.PI*.25);
                if (this.positionX>xEdge && this.positionY<yEdge)
                    myFlags.arcFlag = false;*/
                var yEdge = myScreen.yArcEdge - this.ballSize*2;
                if (this.velocityY>0 && this.positionX>rig.pivotX && this.positionY<yEdge)
                {
                    this.velocityX = .5;
                    this.getMessage(mySayings);
                    myFlags.arcFlag = false;
                }
                else if(this.velocity>0 && this.message == "")
                {
                    this.getMessage(mySayings);
                }
                    
            };
            
            moveObject.prototype.updateBallistic = function (context, rig, myTimer, myPhysics, myFlags, myScreen) 
            {
                var xEdge = rig.pivotX-9+(rig.radiusOfLine+35)*Math.sin(Math.PI*.25);
                var yEdge = rig.pivotY+4+(rig.radiusOfLine+35)*Math.cos(Math.PI*.25)-35;
                
                if (this.angle < -2*Math.PI)
                    this.angle = 0;
                if (this.angle<-1.4 && this.angle > -2*Math.PI)
                    this.angle -= .1;
                else if(this.angle <0)
                    this.angle += .033;
                
                //fall if not on the platform
                if(this.positionY<yEdge)
                {
                    this.velocityY += .3 * myPhysics.gravity * myTimer.timeDelta;
                    this.positionY += this.velocityY;
                }
                else
                {   
                    //break hard on ledge, otherwise, no change in x-velocity
                    if(this.velocityX>0)
                        this.velocityX +=  -myPhysics.gravity * myTimer.timeDelta;
                    else
                        this.velocityX =0;
                    
                    this.velocityY = 0;
                }
               
                if(this.velocityX > 0)
                    this.positionX += this.velocityX;
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
                    this.PieceImg.src = "imageFiles/gourdPie2.png";                    
            };
            
            MelonPiece.prototype.updatePosition = function(physics, time_delta, maxHeight)
            {
                if (this.positionY < (maxHeight-23))
                {
                    this.velocityY += -physics.gravity*time_delta;
                    this.positionY -= this.velocityY ;
                    this.positionX -= this.velocityX ;
                    this.rotationAngle += (this.velocityX/45) * Math.PI;
                    
                }
            };
            
            MelonPiece.prototype.draw = function(context)
            {
                var sizeI = 16;
                context.save();
                    context.translate(this.positionX+8, this.positionY+8);
                    context.rotate(this.rotationAngle);
                    context.drawImage(this.PieceImg, -8,-8, sizeI, sizeI);               
                context.restore();
            };
            
            function createMelonPieces (forceSize, vx, ball)
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
                        var mp1 = new MelonPiece(ball.positionX, ball.positionY, vx, vy, randSize, randRotation);
                        var mp2 = new MelonPiece(ball.positionX, ball.positionY, vx, -vy, randSize, -randRotation);
                        ball.pieces.push(mp1);
                        ball.pieces.push(mp2);
                    }
                }
            }