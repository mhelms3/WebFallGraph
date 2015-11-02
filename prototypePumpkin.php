<!DOCTYPE html>
<!--
    Copyright CEISMC, Georiga Institute of Technology, 2015
    Code Author: Michael Helms, PhD
    Last Modified: April 15, 2015
-->

<!DOCTYPE html>
 
<html>
    <head> 
        <title>Gourdon, The Flying Pumpkin</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styleSheet.css">
         
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script src="jsFiles/main.js"></script>
        <script src="jsFiles/moveObject.js"></script>
        <script src="jsFiles/arcPath.js"></script>
        <script src="jsFiles/drawWall.js"></script>
        <script src="jsFiles/rig.js"></script>
        <script src="jsFiles/drawGraphPaper.js"></script>
        <script src="jsFiles/utils.js"></script>
        <script src="jsFiles/drawScene.js"></script>
        <script src="jsFiles/simpleObjects.js"></script>
        <script src="jsFiles/animateObjects.js"></script>
        <script src="jsFiles/buttonBehaviors.js"></script>
        
        
      
    </head>
     
    <body>
        <div id="topTitle"><h2>The Flying Pumpkin</h2></div>
        
        <div id="leftPane">
            <canvas id="myCanvas" width="700" height="475">
                <!-- Insert fallback content here -->
            </canvas>
            <div id="bottomPane">
                
                <button class ="progressButton" id="scenario1" >1. Skater Speed Check</button>
                <button class ="progressButton" id="scenario2" >2. Smashing Pumpkins</button>
                <button class ="progressButton" id="scenario3" >3. Helmet Tests </button>
                <button class ="progressButton" id="scenario4" >4. New Skate Parks </button>
            </div>
        </div>
        
        <div id="rightPane">
                    
                <button id="startStop">Begin Simulation</button>
                <br>
                <text id="ticMessage">Choose where to start the flying pumpkin</text>
                <select id="ticPicker" name="ticPicker">                   
                   <option value=1>A</option>
                   <option value=2>B</option>
                   <option value=3>C</option>
                   <option value=4>D</option>
                   <option value=5>E</option>
                   
                </select> 
                <br>
                <br>
                
                <text id="helmetMessage" visibility="hidden">Choose which helmet to use</text>
                <select id="helmetPicker" visibility="hidden" name="helmetPicker">                   
                   <option value=1>Black Helmet</option>
                   <option value=2>Green Helmet</option>
                   <option value=3>Eagle Helmet</option>
                   <option value=4>Pink Helmet</option>
                </select> 
                
                <br>
                <br>    
                
                <!-- DRAG IS DISABLED
                <input type ="checkbox" id="dragCheck" checked><span id="dragLabel">Drag ON</span> 
                 -->
                   
                <br>
                <br>
                <table id="ballData" style="width:100%">
                    <tr>
                        <th>Pumpkin Level</th>
                         
                        <th>Max Speed<button id="velocityGraph" disabled="true" hidden="hidden">graph</button></th> 
                        <th>Damage - No Helmet<button id="forceGraph" disabled="true" hidden ="hidden">graph</button></th>
                        <th>Damage - With Helmet<button id="helmetGraph" disabled="true" hidden ="hidden">graph</button></th>
                         
                         <!--
                        <th>Max Speed</th> 
                        <th>Pie Filling</th>
                         -->
                         
                        
                      </tr>
                    <tr>
                      <td id="1r">A</td>
                      <td id="1v">--</td>
                      <td id="1f">--</td>
                      <td id="1h">--</td>
                    </tr>
                    <tr>
                      <td id="2r">B</td>
                      <td id="2v">--</td>
                      <td id="2f">--</td>
                      <td id="2h">--</td>
                    </tr>
                    <tr>
                      <td id="3r">C</td>
                      <td id="3v">--</td>
                      <td id="3f">--</td>
                      <td id="3h">--</td>
                    </tr>
                    <tr>
                      <td id="4r">D</td>
                      <td id="4v">--</td>
                      <td id="4f">--</td>
                      <td id="4h">--</td>
                    </tr>
                    <tr>
                      <td id="5r">E</td>
                      <td id="5v">--</td>
                      <td id="5f">--</td>
                      <td id="5h">--</td>
                    </tr>                   
                </table> 
                <button id="clearTable">Clear Table</button>
                
        
        </div>
    </body>
</html>

