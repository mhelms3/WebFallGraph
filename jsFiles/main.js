/* 
 * Copyright CEISMC, 2015
 */

$(window).load(function() {             
            
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');  
            var myPhysics = new physicsObject(9.8, .0004); //gravity & drag Factor
            var myScreen = new screenObject(450, 695); //size of window inside of canvas (canvas width="600" height="475")
            var myTimer = new timerObject(); //tracks time elements of simulation
            var myFlags = new flags(); //all flags set to true by default (updated in init, when 'false' should be starting value)
            var mySayings = new sayings();
            
            var rig = new movePath(310, 145, 5); //pivot point, number of tics on scale
            var ball = new moveObject(20, 5, 300, 395, 0, 0);  //the moving object, size, mass, (x,y) starting coordinates, (x,y) starting velocity 
            
            
            
            init(context, ball, rig, myScreen, myFlags, mySayings);
            
            enableButtons(context, rig, ball, myScreen, myFlags, myTimer, myPhysics, mySayings);
});
            
                       
       

