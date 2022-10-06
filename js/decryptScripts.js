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

    
    
    $('.decrypt-button').click(function(){
        var message = [];

        var numRows = location / 17;
        var groupsOfNine = location / (17 * 9);
        var startingYValue = 0;
        for(var i = 0; i < groupsOfNine; i++) {
            var numNeededPerPass = numRows - startingYValue;
            if(numNeededPerPass > 9) {
                numNeededPerPass = 9;
            }
            var currentMaxYValue = startingYValue + numNeededPerPass;
            for(var j = 0; j < 17; j++) {
                var xValue = j;
                var yValue = startingYValue;
                for(var k = 0; k < numNeededPerPass; k++) {
                    var currentId = yValue * 17 + xValue;
                    var currentImg = $('#' + currentId).attr('class');
                    message.push(currentImg);
                    if(message.length >= location) {
                        var result = decryptMessage(message);
                        $('#write').val(result);
                        return;
                    }
                    console.log("x val");
                    console.log("y val");
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
                }
            }
            startingYValue += 9;
        }
    });

    $('.export-button').click(function(){
        var message = "";
        for(var i = 0; i <= location; i++) {
            message = message + $('#' + i).attr('class');
            if(i!=location) {
                message += " ";
            }
        }
        download("EncryptedMessage.txt", message);
    });

    $('.export-text-button').click(function(){
        var message = $('#write').val();
        download("DecryptedMessage.txt", message);
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
        if(!isNaN(character) && parseInt(character) <= 73) {
            $('#' + location).html('<img src="./symbols/' + character + '.png"/>');
        }
        else {
            $('#' + location).html('<img src="./symbols/0.png"/>');
        }
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

    document.getElementById('customFile').addEventListener('change', readFileAsString)
    function readFileAsString() {
        var files = this.files;
        if (files.length === 0) {
            console.log('No file is selected');
            return;
        }

        // import
        var reader = new FileReader();
        reader.onload = function(event) {
            var encryptedMessage = event.target.result;
            var values = encryptedMessage.split(" ");
            reset();
            for(var i = 0; i < values.length; i++) {
                addLetter(values[i]);
            }
        };
        reader.readAsText(files[0]);
    }
});

function decryptMessage(message) {
    var messageString = "";
    for(var i = 0; i < message.length; i++) {
        if(message[i] == "7" || message[i] == "39" || message[i] == "43" || message[i] == "66" || message[i] == "72") {
            messageString += "A";}
        
        else if(message[i] == "58" || message[i] == "63") {
            messageString += "B";}
        
        else if(message[i] == "67") {
            messageString += "C";}
        
        else if(message[i] == "18" || message[i] == "29" || message[i] == "47") {
            messageString += "D";}
        
        else if(message[i] == "16" || message[i] == "30" || message[i] == "42" || message[i] == "59" || message[i] == "60" || message[i] == "62" || message[i] == "73") {
            messageString += "E";}
        
        else if(message[i] == "34") {
            messageString += "F";}
        
        else if(message[i] == "40") {
            messageString += "G";}
        
        else if(message[i] == "8") {
            messageString += "H";}
        
        else if(message[i] == "24" || message[i] == "36" || message[i] == "37" || message[i] == "44" || message[i] == "65" || message[i] == "71") {
            messageString += "I";}
        
        else if(message[i] == "27") {
            messageString += "J";}  
            
        else if(message[i] == "56") {
            messageString += "K";}               
        
        else if(message[i] == "19" || message[i] == "61" || message[i] == "70") {
            messageString += "L";}
        
        else if(message[i] == "14") {
            messageString += "M";}
        
        else if(message[i] == "10" || message[i] == "21" || message[i] == "26" || message[i] == "32" || message[i] == "53") {
            messageString += "N";}
        
        else if(message[i] == "41" || message[i] == "46" || message[i] == "50" || message[i] == "57") {
            messageString += "O";}
        
        else if(message[i] == "20" || message[i] == "64") {
            messageString += "P";}
 
        else if(message[i] == "25" || message[i] == "45") {
            messageString += "Q";} 
        
        else if(message[i] == "13" || message[i] == "33" || message[i] == "48" || message[i] == "52"  || message[i] == "54") {
            messageString += "R";}
        
        else if(message[i] == "4" || message[i] == "9" || message[i] == "38" || message[i] == "49") {
            messageString += "S";}
        
        else if(message[i] == "2" || message[i] == "3" || message[i] == "5" || message[i] == "22" || message[i] == "23" || message[i] == "35") {
            messageString += "T";}
        
        else if(message[i] == "11" || message[i] == "28" || message[i] == "68") {
            messageString += "U";}
        
        else if(message[i] == "17") {
            messageString += "V";}
        
        else if(message[i] == "6" || message[i] == "51") {
            messageString += "W";}
            
        // Note: the following were not given in the key
        else if(message[i] == "1" || message[i] == "12" || message[i] == "62" ) {
            messageString += "X";}            
        
        else if(message[i] == "15" || message[i] == "31") {
            messageString += "Y";}

        else if(message[i] == "69") {
            messageString += "Z";}
            
/*        else if(message[i] == "0") {
        }
        
        else if(message[i] == "75") {
            console.log("75 detected");
            messageString+=" ";} */
        
        else {
            messageString += message[i];}
    }
    
    return messageString;}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

