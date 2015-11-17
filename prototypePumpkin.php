<!DOCTYPE html>
<!--
    Copyright CEISMC, Georiga Institute of Technology, 2015
    Code Author: Michael Helms, PhD
    Last Modified: April 15, 2015
-->

<!DOCTYPE html>

<html>
    <head> 
        <title>The Helmet Challenge - Simulation Tool</title>
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
        <div id="topTitle"><h3>The Helmet Challenge - Simulation Tool</h3></div>

        <div id="leftPane">
            <canvas id="myCanvas" width="700" height="475">
                <!-- Insert fallback content here -->
            </canvas>
            <div id="bottomPane">

                <button class ="progressButton" id="scenario1" >1. Skater Speed Check</button>
                <button class ="progressButton" id="scenario2" disabled="disabled">2. Smashing Pumpkins</button>
                <button class ="progressButton" id="scenario3" disabled="disabled">3. Smashing with Sensor</button>
                <button class ="progressButton" id="scenario4" disabled="disabled">4. Helmet Tests </button>
                <button class ="progressButton" id="scenario5" disabled="disabled">5. New Skate Parks </button>
            </div>
            <div id="passcodeDiv">
                <br>
                Enter passcode here to advance to the next level of analysis     <input type="text" id="passcodeInput" value="enter passcode">
                <br>
            
            </div>
        </div>

        <div id="rightPane"  style="display:none;">

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
                <option value=5>Blue Helmet</option>
                <option value=6>Red Helmet</option>
                <option value=7>Halo Helmet</option>
                <option value=8>Stormtrooper Helmet</option>
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

                    <th>Max Speed (m/s)<button id="velocityGraph" disabled="true" hidden="hidden">graph</button></th> 
                    <th>Percent Damaged (%)<button id="velocityGraph" disabled="true" hidden="hidden">graph</button></th> 
                    <th>Energy - No Helmet (Joules)<button id="forceGraph" disabled="true" hidden ="hidden">graph</button></th>
                    <th>Energy - With Helmet (Joules)<button id="helmetGraph" disabled="true" hidden ="hidden">graph</button></th>

                    <!--
                   <th>Max Speed</th> 
                   <th>Pie Filling</th>
                    -->


                </tr>
                <tr>
                    <td id="1r">A</td>
                    <td id="1v">--</td>
                    <td id="1p">--</td>
                    <td id="1f">--</td>
                    <td id="1h">--</td>
                </tr>
                <tr>
                    <td id="2r">B</td>
                    <td id="2v">--</td>
                    <td id="2p">--</td>
                    <td id="2f">--</td>
                    <td id="2h">--</td>
                </tr>
                <tr>
                    <td id="3r">C</td>
                    <td id="3v">--</td>
                    <td id="3p">--</td>
                    <td id="3f">--</td>
                    <td id="3h">--</td>
                </tr>
                <tr>
                    <td id="4r">D</td>
                    <td id="4v">--</td>
                    <td id="4p">--</td>
                    <td id="4f">--</td>
                    <td id="4h">--</td>
                </tr>
                <tr>
                    <td id="5r">E</td>
                    <td id="5v">--</td>
                    <td id="5p">--</td>
                    <td id="5f">--</td>
                    <td id="5h">--</td>
                </tr>                   
            </table> 
            <button id="clearTable">Clear Table</button>


        </div>
    </body>
</html>

