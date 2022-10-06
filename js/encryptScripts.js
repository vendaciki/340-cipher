$(function(){
    var location = 0;
	
	$('#keyboard li').click(function(){
        var $this = $(this);
        
        // Delete
		if ($this.hasClass('delete')) {
            if(location >= 0) {
                $('#' + location).html('<img src="./symbols/0.png"/>')
                $('#' + location).removeClass();
                $('#' + location).addClass('0');
                if(location > 0) {
                    location--;
                }
            }
		}
		
		if ($this.hasClass('symbol')) {
            character = $this.attr('class').split(' ')[1];
            addLetter(character);
        }
    });

    $('.encrypt-button').click(function(){
        var message = $('#write').val();

        var numRows = message.length / 17;
        console.log("num rows: " + numRows);
        for(var i = 1; i < numRows; i++) {
            console.log("adding row with " + (i * 17));
            addRow(i * 17);
        }

        var groupsOfNine = message.length / (17 * 9);
        var listIndex = 0;

        console.log("go9: " + groupsOfNine);
        var startingYValue = 0;
        for(var i = 0; i < groupsOfNine; i++) {
            // Each group of nine lines
            var numNeededPerPass = numRows - startingYValue;
            if(numNeededPerPass > 9) {
                numNeededPerPass = 9;
            }
            console.log("num needed per pass: " + numNeededPerPass);
            var currentMaxYValue = startingYValue + numNeededPerPass;
            for(var j = 0; j < 17; j++) {
                // For each value along the top row of the group of nine
                var xValue = j;
                var yValue = startingYValue;
                console.log("starting x: " + xValue);
                console.log("starting y: " + yValue);
                for(var k = 0; k < numNeededPerPass; k++) {
                    // for each value in the diagonal
                    if(listIndex < message.length) {
                        // Getting next letter
                        
                        //if(message[listIndex] != undefined) {
                            var symbolValue = getSymbolFromLetter(message[listIndex]);
                            var imageValue;
                            if(symbolValue == " ") {
                                console.log("herehehe");
                                imageValue = 0;
                                symbolValue = "75";
                            }
                            else if(symbolValue == message[listIndex].toUpperCase()) {
                                imageValue = 0;
                            }
                            else {
                                imageValue = symbolValue;
                            }

                            var currentId = yValue * 17 + xValue;

                            $('#' + currentId).html('<img src="./symbols/' + imageValue + '.png"/>');
                            $('#' + currentId).removeClass();
                            $('#' + currentId).addClass(symbolValue);
                            
                            xValue+=2;
                            yValue++;
                            if(xValue == 17) {
                                xValue = 0;
                            }
                            else if(xValue == 18) {
                                xValue = 1;
                            }
                            if(yValue > currentMaxYValue) {
                                yValue--;
                                xValue = 0;
                            }
                            if(currentId > location) {
                                location = currentId;
                            }
                        //}
                        listIndex++;
                    }
                    else {
                        return;
                    }
                }
            }
            startingYValue += 9;
        }
    });
    
 

    $('.export-button').click(function(){
        var message = "";
        for(var i = 0; i <= location; i++) {
            var value = $('#' + i).attr('class');
            //if(value != "0") {
                message = message + value;
                if(i!=location) {
                    message += " ";
                }
            //} 
        }
        download(message);
    });

    $('.reset-button').click(function(){
        reset();
    });

    function reset() {
        while(location >= 0) {
            $('#' + location).html('<img src="./symbols/0.png"/>')
            $('#' + location).removeClass();
            $('#' + location).addClass('0');
            location--;
        }
        location = 0;
        $('#write').val('');
        $('.encrypted').html('<tr align="center"><td scope="col" id="0" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="1" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="2" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="3" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="4" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="5" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="6" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="7" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="8" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="9" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="10" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="11" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="12" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="13" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="14" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="15" class="0"><img src="./symbols/0.png"/></td><td scope="col" id="16" class="0"><img src="./symbols/0.png"/></td></tr>');
    }

    function addLetter(character) {
        $('#' + location).html('<img src="./symbols/' + character + '.png"/>');
        $('#' + location).removeClass();
        $('#' + location).addClass(character);

        location++;

        if(location % 17 == 0) {
            addRow(location);
        }
    }

    function addRow(location) {
        $('.encrypted').html($('.encrypted').html() + 
            '<tr align="center"><td scope="col" class="0" id="'
            + location +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 1) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 2) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 3) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 4) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 5) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 6) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 7) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 8) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 9) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 10) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 11) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 12) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="' 
            + (location + 13) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 14) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 15) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 16) +
            '"><img src="./symbols/0.png"/></td><td scope="col" class="0" id="'
            + (location + 17) +
            + '"><img src="./symbols/0.png"/></td></tr>'
        )
    }
});

function getSymbolFromLetter(letter) {
    if(letter == undefined)
        return undefined
    letter = letter.toUpperCase();
    if(letter == "A") {
        array = ["7", "39", "43", "66", "72"]
        return array[Math.floor(Math.random() * array.length)];
    }
    else if(letter == "B") {
        array = ["58", "63"]
        return array[Math.floor(Math.random() * array.length)];
    }
    else if(letter == "C") {
        return "67";
    }
    else if(letter == "D") {
        array = ["18", "29", "47"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "E") {
        array = ["16", "30", "42", "59", "60", "73", "62"] // 62 added
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "F") {
        return "34";}
    
    else if(letter == "G") {
        return "40";}
    
    else if(letter == "H") {
        return "8";}
    
    else if(letter == "I") {
        array = ["24", "36", "44", "65", "71", "37"] // 37 added
        return array[Math.floor(Math.random() * array.length)];}

    else if(letter == "J") {
        return "27";}
        
    else if(letter == "K") {
        return "56";}     
            
    else if(letter == "L") {
        array = ["19", "61", "70"]
        return array[Math.floor(Math.random() * array.length)];}  
    
    else if(letter == "M") {
        return "14";}
    
    else if(letter == "N") {
        array = ["10", "21", "26", "32", "53"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "O") {
        array = ["41", "46", "50", "57"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "P") {
        array = ["20", "64"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "Q") {
        array = ["25", "45"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "R") {
        array = ["13", "33", "48", "52", "54"]
        return array[Math.floor(Math.random() * array.length)];}
        
    else if(letter == "S") {
        array = ["4", "9", "38", "49"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "T") {
        array = ["2", "3", "5", "22", "23", "35"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "U") {
        array = ["11", "28", "68"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "V") {
        return "17";}
    
    else if(letter == "W") {
        array = ["6", "51"]
        return array[Math.floor(Math.random() * array.length)];}
    
    else if(letter == "Y") {
        array = ["15", "31"]
        return array[Math.floor(Math.random() * array.length)];}
    
    // Note: the following were not given in the key
    else if(letter == "X") {
        array = ["1", "12", "62"]
        return array[Math.floor(Math.random() * array.length)];}
        
    else if(letter == "Z") {
        return "69";}
    
    else {
        return letter;}
}

function download(text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "EncryptedMessage.txt");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

