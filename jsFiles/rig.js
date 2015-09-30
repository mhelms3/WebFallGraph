/* 
 * Copyright CEISMC, 2015
 */
var movePath = function(topX, topY, maxTicNumber){ 
                  this.pivotX = topX;  //top of crane
                  this.pivotY = topY;  //top of crane
                  this.maxTicNumber = maxTicNumber;
                  this.radiusOfLine = 0;
            };
            
movePath.prototype.connectToMover = function(context, shade)
    {
         //assumes context is centered at pivot point and alread rotated
         context.save();
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(0,0,0,'+shade+')';
            context.beginPath();
                context.moveTo(0,0);
                context.lineTo(0, this.radiusOfLine);
                context.stroke();
         context.restore();   
    };
