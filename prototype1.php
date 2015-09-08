<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<!DOCTYPE html>
 
<html>
    <head>
        <title>Canvas from scratch</title>
        <meta charset="utf-8">
         
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
         
        <script>
            $(document).ready(function() {             
            var earth = new Image();
            var gravity = 9.8/20;
            var elasticity = .90;
            var snapShots = [];
            var fallingObjectClass = function(s, x, y, vx, vy, tx, ty){
                    this.size = s; 
                    this.positionX = x; 
                    this.positionY = y; 
                    this.velocityX = vx;
                    this.velocityY = vy;
                    this.translatedY = tx;
                    this.translatedX = ty;
                 };
            
            
            function ballClass (s, x, y, vx, vy, tx, ty){             
                fallingObjectClass.call(this, s, x, y, vx, vy, tx, ty);                
            }            
            ballClass.prototype = Object.create(fallingObjectClass.prototype);
            ballClass.prototype.constructor = ballClass;            
            ballClass.prototype.draw = function(context, shade){                
                context.save();
                    context.lineWidth = 1;
                    context.strokeStyle = 'rgba(0,153,0,'+shade+')';
                    context.translate(this.positionX, this.positionY)
                    context.beginPath();
                    context.arc(0, 0, this.size, 0, Math.PI*2,false); // Earth orbit
                    
                    context.stroke();
                context.restore();
            };
            
            function trooperClass (s, x, y, vx, vy, tx, ty){             
                fallingObjectClass.call(this, s, x, y, vx, vy, tx, ty);                
            }            
            trooperClass.prototype = Object.create(fallingObjectClass.prototype);
            trooperClass.prototype.constructor = trooperClass;            
            trooperClass.prototype.draw = function(context, shade){                
                context.save();
                    context.lineWidth = 1;
                    context.strokeStyle = 'rgba(153,0,0,'+shade+')';
                    context.translate(this.positionX, this.positionY)
                    context.beginPath();                    
                    context.arc(0, 0, this.size, 0, Math.PI*2,false);  
                    context.moveTo(0, this.size);
                    context.lineTo(0, this.size+6);
                    context.moveTo(-4, this.size+4);
                    context.lineTo(4, this.size+4);
                    context.moveTo(0, this.size+6);
                    context.lineTo(-4, this.size+10);
                    context.moveTo(0, this.size+6);
                    context.lineTo(4, this.size+10);
                    context.stroke();
                context.restore();
            };
            
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d"); 
            var faller = new trooperClass(5, 20, 20, 2, 0, 0, 0);
            var snapFrequency = 4;
            //var ctx = document.getElementById('myCanvas').getContext('2d');
            var boxHeight = 625;
            var boxWidth = 495;
            var timeSteps = 0;
            var cycles=215;
            var timeOutLength=20;
            
                    
            function init(){                            
              
              ctx.save();  
                ctx.lineWidth = 10;
                ctx.strokeRect(5,5,boxWidth-5,boxHeight-5);
              ctx.restore();
              draw();
              
            }
            
            function draw() {
              //var canvas = document.getElementById("myCanvas");
              //var ctx = canvas.getContext("2d");
              
              var bumpXY = faller.size+3;
              
              var baseX =faller.positionX-bumpXY;
              var baseY =faller.positionY-bumpXY;                           
              
              ctx.globalCompositeOperation = 'source-over';              
              //ctx.clearRect(baseX, baseY, 2*bumpXY, 2*bumpXY); // clear ball              
              ctx.clearRect(10, 10, boxWidth-15, boxHeight-15); // clear ball              
              //ctx.fillRect(50,50, 100, 400);
              ctx.fillStyle = 'rgba(0,0,0,0.7)';
              ctx.strokeStyle = 'rgba(0,153,255,.9)'
              ctx.lineWidth= 4;
              //console.log("V:"+faller.velocityY+ " X:"+faller.positionX+" Y:"+faller.positionY);
              //console.log("V:"+faller.velocityY+ " X:"+baseX+" Y:"+baseY+" Xb:"+baseXb+" Yb:"+baseYb);
              
              
                faller.velocityY = faller.velocityY + gravity;
                faller.positionY = faller.positionY + faller.velocityY;
                faller.positionX = faller.positionX + faller.velocityX;
                //console.log("V:"+faller.velocity+ " X:"+faller.positionX+" Y:"+faller.positionY);

                if (faller.positionY > boxHeight-13)
                {
                    faller.velocityY = -faller.velocityY*elasticity;
                    faller.positionY = ((boxHeight-13)*2)-faller.positionY;

                }
                if (faller.positionY < 10)
                {   
                    faller.velocityY = -faller.velocityY;
                    faller.positionY = 20 - faller.positionY;
                }
                
                if (faller.positionX > boxWidth-13)
                {
                    faller.velocityX = -faller.velocityX*elasticity;
                    faller.positionX = ((boxWidth-13)*2)-faller.positionX;

                }
                if (faller.positionX< 10)
                {   
                    faller.velocityX = -faller.velocityX*elasticity;
                    faller.positionX = 20 - faller.positionX;
                }
                
                faller.draw(ctx, 1);
                //ctx.beginPath();
                //ctx.arc(faller.positionX, faller.positionY, faller.size, 0, Math.PI*2,false); // Earth orbit
                //ctx.stroke();
                timeSteps++;
                
                if(!(timeSteps%snapFrequency))
                {
                    fallIndex = timeSteps/snapFrequency;
                    //console.log(fallIndex);
                    snapShots[fallIndex-1] = new trooperClass(faller.size, faller.positionX, faller.positionY, faller.velocityX, faller.velocityY, 0,0);
                    //console.log(timeSteps);
                }
                
                for (j=0; j<snapShots.length; j++)
                {
                    snapShots[j].draw(ctx, .3);
                    //console.log(j);
                }
            
                if(timeSteps<cycles)
                {
                    writeMessage(canvas, "Running simulation....");
                    setTimeout(draw, timeOutLength);
                }
                else
                {
                   writeMessage(canvas, "Click on a circle to get distance and velocity data.");
                   console.log("done");
               }
            }
        
            function getMousePos(canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
                };
            };

            function writeMessage(canvas, message) {
                var context = canvas.getContext('2d');
                context.clearRect(100, 25, 380, 50);
                context.font = '12pt Calibri';
                context.fillStyle = 'black';
                context.fillText(message, 100, 50);
              }

            function findIntersection (x, y)
            {
                for (k=0; k<snapShots.length; k++)
                {
                    var midx=snapShots[k].positionX;
                    var midy=snapShots[k].positionY;
                    size=snapShots[k].size;
                    
                    if ((x<=midx+size)&&(x>=midx-size)&& (y<=midy+size)&&(y>=midy-size))
                        {   console.log(k);
                            return(k);
                        }
                    //console.log(j);
                }
                return(999);

            };
            


            canvas.addEventListener('click', function(evt) {
                var mousePos = getMousePos(canvas, evt);
                var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
                var fallIntersect = findIntersection(mousePos.x, mousePos.y);
                if (fallIntersect == 999)
                    message = "click on a circle to get its position and velocity"
                else
                {
                    var xdistance = Math.round(snapShots[fallIntersect].positionX*10)/10;
                    var ydistance = Math.round(snapShots[fallIntersect].positionY*10)/10;
                    var yvelocity = Math.round(snapShots[fallIntersect].velocityY*10)/10;
                    var datapoint = fallIntersect+1;
                    message = "time:"+datapoint+"s  vertical distance: "+ydistance+"m  velocity: "+yvelocity+"m/s";
                }
                writeMessage(canvas, message);
            }, false);


            init();
            });
        </script>
    </head>
     
    <body>
        <canvas id="myCanvas" width="500" height="700">
            <!-- Insert fallback content here -->
        </canvas>
        <div id="pane"></div>
    </body>
    
    <script>
    
    /*
    ctx.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(ctx, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
      }, false);*/
      
    
    

          
            
    </script>
</html>
