/* 
 * Copyright CEISMC, 2015
 */
var DestructionRig = function(topX, topY, cLength, cHeight, x, y, cIntTop, cIntRight, cLow, cabWS, boxHeight){ 
                    //this.RigImg=new Image();
                    //this.RigImg.src = "crane.png";
                  this.craneTopX = topX;  //top of crane
                  this.craneTopY = topY;  //top of crane
                  this.cabLength = cLength;
                  this.cabHeight = cHeight;
                  this.cabX = x; 
                  this.cabY = boxHeight-y; 
                  this.craneIntTop = cIntTop;  //top cab crane intersect at X point
                  this.craneIntRight = cIntRight;//right side cab crane intersect at Y point
                  this.craneLow = cLow;     //bottom intersect of crane
                  this.cabWindowSize = cabWS;                  
            };
            
            DestructionRig.prototype.draw = function(context, shade){    
                
                
                    //context.drawImage(this.RigImg,5,95, 300, 350);
                
                //context.drawImage(this.RigImg,this.cabX,this.craneTopY, 300, 300);
                /*context.save();
                    context.lineWidth = 1;
                    context.strokeStyle = 'rgba(100,200,100,'+shade+')';
                    context.fillStyle = 'rgba(0,153,0,'+shade+')';
                    context.translate(this.cabX, this.cabY);
                    context.strokeRect(0,0, this.cabLength, this.cabHeight);
                    context.strokeRect(5,5,this.cabWindowSize, this.cabWindowSize);                    
                    context.beginPath();                                         
                        context.moveTo(this.craneIntTop, 0);
                        context.lineTo(this.craneTopX-this.cabX, this.craneTopY-this.cabY);
                        context.lineTo(this.cabLength, this.craneIntRight);  
                        context.lineTo(this.craneIntTop, this.craneLow);
                        context.lineTo(this.craneIntTop, 0);
                    context.closePath();                    
                    context.stroke();
                context.restore();*/
            };
            
            function connectRigBall (context, rig, ball, shade, radiusOfLine){
                context.save();
                    context.lineWidth = 2;
                    context.strokeStyle = 'rgba(0,0,0,'+shade+')';
                    context.beginPath();
                        //context.moveTo(rig.craneTopX, rig.craneTopY);
                        context.moveTo(0,0);
                        context.lineTo(0, radiusOfLine);
                        context.stroke();
                context.restore();                
            };

