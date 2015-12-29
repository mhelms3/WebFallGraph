<!DOCTYPE html>
<!--
    Copyright CEISMC, Georiga Institute of Technology, 2015
    Code Author: Michael Helms, PhD
    Last Modified: April 15, 2015
-->

<!DOCTYPE html>

<?php 


    $table1ID = "ballData";
    $table1Columns = 5;
    $table1Rows = 5;
    $table1rowLabels = array("r", "v", "p", "f", "h");
    $table1rowText = array("A", "B", "C", "D", "E");
    $table1HeaderText = array("Pumpkin Level", "Max Speed (m/s)", "Percent Damanged (%)", "Energy - No Helmet (Joules)", "Energy - With Helmet (Joules)");
    
    $table2ID = "altData";
    $table2Columns = 2;
    $table2Rows = 5;
    $table2rowLabels = array("pr", "pf");
    $table2rowText = array("Rabbit Run", "Crocodile Cove", "Pyramid Parks", "Lunar Launchpad", "The Big Kahuna");
    $table2HeaderText = array("Park", "Energy - (Joules)");
    
    $helmetRows = 8;
    //$helmetText = array("Black Helmet", "Green Helmet", "Eagle Helmet", "Pink Helmet", "Blue Helmet", "Red Helmet", "Halo Helmet", "Stormtrooper Helmet");
    $helmetText = array("Red Helmet", "Pink Helmet", "Black Helmet", "Blue Helmet", "Stormtrooper Helmet", "Eagle Helmet", "Halo Helmet", "Green Helmet");
    $helmetValue = array(6, 4, 1, 5, 8, 3, 7, 2);
                    
    


function makeTable($tableID, $colSize, $rowSize, $headerText, $rowIDs, $rowText)
{
                echo("<table id="); echo($tableID); echo('">');
                echo("<tr>");
                for($j=0; $j<$colSize; $j++)
                   {
                       echo('<th>');
                       echo($headerText[$j]);
                       echo('</th>');
                   }
                echo("</tr>");
                for($i=0; $i<$rowSize; $i++)
                {
                    echo("<tr>");
                    for($j=0; $j<$colSize; $j++)
                    {
                        echo('<td id="');
                        echo($i+1);
                        echo($rowIDs[$j]);
                        echo('">');
                        //kludgy -- I know that only the first two will have text, the rest is "--"
                        if($j==0)
                            {echo($rowText[$i]);}
                        else
                            {echo('--');}
                        echo('</td>');
                    }
                    echo("</tr>");
                }
                echo("</table>");
};

function makeOptionList ($listName, $listLength, $listIDs, $listText, $isVisible, $values)
{
    echo('<select id="');
    echo($listName);
    echo('" name="');
    echo($listName);
    if(!$isVisible)
    {
        echo(' visibility="hidden"');
    }
    echo('">');
    
    for ($i=0; $i<$listLength; $i++)
    {
        echo('<option id="');
        echo($listIDs);
        echo($i+1);
        echo('" value=');
        if($values == null)
            echo($i+1);
        else
            echo($values[$i]);
        echo(">");
        echo($listText[$i]);
        echo("</option>");
    }
    echo("</select>");
}


?>


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

            
            <span id="ticPickerSpan" style="display:block;">
                <text id="ticMessage">Choose where to start the flying pumpkin</text>
                <?php
                    makeOptionList("ticPicker", $table1Rows, "tp" , $table1rowText, true, null); 
                ?>
            </span>
            
            <span id="parkPickerSpan" style="display:none;">
                <text id="parkMessage">Choose which park to test</text>
                <?php
                    makeOptionList("parkPicker", $table2Rows, "pp" , $table2rowText, true, null); 
                ?>
            </span>
           
            <text id="helmetMessage" visibility="hidden">Choose which helmet to use</text>
            <?php
                makeOptionList("helmetPicker", $helmetRows, "hh" , $helmetText, false, $helmetValue); 
            ?>
            <br>

            <!-- DRAG IS DISABLED
            <input type ="checkbox" id="dragCheck" checked><span id="dragLabel">Drag ON</span> 
            -->
            <button id="startStop">Begin Simulation</button>
            
            <br>
            <br>
            <span id="mainTable" style="display:block;">
                <?php 
                    makeTable($table1ID, $table1Columns, $table1Rows, $table1HeaderText, $table1rowLabels, $table1rowText)
                ?>
            </span>
            
            <span id="altTable" style="display:none;">
                <?php 
                    makeTable($table2ID, $table2Columns, $table2Rows, $table2HeaderText, $table2rowLabels, $table2rowText)
                ?>
            </span>
            
            <button id="clearTable">Clear Table</button>


        </div>
    </body>
</html>

