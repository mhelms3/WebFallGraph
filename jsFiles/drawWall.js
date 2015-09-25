/* 
 * Copyright CEISMC, 2015
 */

function drawWall(context)
            {
                context.save();
                    context.fillStyle = "rgba(132,31,39,1)"; 
                    context.globalCompositeOperation = "source-over";
                    //context.globalCompositeOperation = "destination-out";
                    context.translate(320, 250);
                    context.fillRect(0,0, 50, 195);
                    context.strokeStyle = "rgba(192,192,192,1)";
                    var bumpBrick = 0; 
                    for(var i=0; i<20; i++)
                    {
                        context.beginPath();     
                            context.moveTo(0, i*10);
                            context.lineTo(50, i*10);                            

                        if(i%2)
                            bumpBrick = 10;
                        else
                            bumpBrick=0;
                        
                        if (i<19)
                        {
                            context.moveTo(0, i*10);
                            context.lineTo(0, 10+i*10);

                            context.moveTo(10+bumpBrick, i*10);
                            context.lineTo(10+bumpBrick, 10+i*10);

                            context.moveTo(30+bumpBrick, i*10);
                            context.lineTo(30+bumpBrick, 10+i*10);

                            context.moveTo(50, i*10);
                            context.lineTo(50, 10+i*10);
                        }
                        else
                        {
                            context.moveTo(0, i*10);
                            context.lineTo(0, 5+i*10);

                            context.moveTo(10+bumpBrick, i*10);
                            context.lineTo(10+bumpBrick, 5+i*10);

                            context.moveTo(30+bumpBrick, i*10);
                            context.lineTo(30+bumpBrick, 5+i*10);

                            context.moveTo(50, i*10);
                            context.lineTo(50, 5+i*10);
                        }
                        

                        context.stroke();                                
                    };

                context.restore();
            };
            
