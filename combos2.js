// js used to save the png picture, courtesy of https://stackoverflow.com/questions/6887183/how-to-take-screenshot-of-a-div-with-javascript answer by Andy
$(function() { 
    $("#btnSave").click(function() { 
        html2canvas($("#combo"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                canvas.toBlob(function(blob) {
					saveAs(blob, "Combo.png"); 
				});
            }
        });
    });
}); 

/*
	What's a valid input : (1)
	can contain from 1 to 4 button inputs, separated by a + sign 
		1, 1+3, 1+2+3+4 are valid inputs
	can contain 1 direction
		f, u/f, F are valid inputs
		fF is not, it should be f,F or f F
	subsequently
		f+1, D/F+2+3, b+1+2+3+4 are all valid inputs
		fndd/f2 isn't a valid input, it should be written as f,n,d,d/f,2 (or d/f+2), or cd,2 or cd+2 (see semantics for what directions are allowed)
	; is a valid input that's gonna translate as the "into" icon, to show the succession between two distinct inputs
*/

function main() {
	var combo = comboRead();
	var array = comboToArray(combo);
	var validArray = comboValid(array);
	// We have an array of valid inputs, now we need to process them to get our combo visual representation.
	comboToImage (validArray);
}

var validDirections = ["f", "b", "d", "n", "d/b", "d/f", "u/f", "u/b", "F", "B", "D", "D/B", "D/F", "U/F", "U/B", 
					   "qcf", "qcb", "QCF", "QCB", "cd", "CD", "ws", "WS", ";"]; // ; is treated as a direction, as it will always be separated from other inputs.
var validButtons = ["1", "2", "3", "4", "1+2", "1+3", "1+4", "2+3", "2+4", "3+4", "1+2+3", "1+2+4", "1+2+3+4"];

function debug(string){
	document.getElementById("debug").innerHTML = document.getElementById("debug").innerHTML + "<br/>" + string;
}

function comboRead() { // Reads the input from the comboString form
		var comboInput = document.getElementById('comboString').value;
		//window.alert(comboInput);	
		return comboInput;
}

function comboToArray(comboInput) { //puts our combo inside an array
	// one move (== simultaneous inputs) per array element (1)
	// space is the separator
	// allow for , as a separator too
	var tmp = [];
	var tmpString = comboInput.replace(/,/g, " "); // replace all "," with " ", "," becomes a valid separator 
													// replace (str, str) replaces only the first one, /,/g (g for global replaces all)
	tmp = tmpString.split(" ");						// split around spaces, each array element is a submitted input
													// Now we need to check if each submitted input is a valid input as per (1)
	return tmp;										// The combo has been converted to array, so new function will take over : comboValid()
}

function comboValid(arrayIn) {// Receives an array of inputs (strings), returns an array of valid (1) inputs (strings)
	
	// We receive an array of non verified inputs
	// We need to handle the plus sign
	var tmp = [];
	var x;
	var arrx;
	for (x in arrayIn) {
		arrx = arrayIn[x];
		tmp = tmp.concat(validatePlus(arrx));
	}
	// tmp only contains inputs that respect the rules of using +
	// we'll use this function if we need additional rules checks later.
	return tmp;	
}

function validatePlus(stringIn) {// Handles the + signs
	// 1 check for + signs, if there are not, return stringIn as Array[0]
	// 						 if there are, we need to check how the input is structured
	// 2 check if the first input is a direction, if it is, we split the string around the +, add the first input to the return array,
	//																						   then check the part after + from 1- again.
	// 3 if it's not a direction, we return the string as Array[0] 
	//						(I'm assuming the user won't input 1+f, the man explains how the inputs should be written)
	
	// Return is an array of inputs respecting the rules about using +
	
	var tmp = [];
	var pos = stringIn.indexOf("+");
	if (stringIn.length != 0) { // in case I somehow fucked it all up and it ends up looping endlessly
		if (pos != -1 ){ // We find + in stringIn ( test 1)
			var start = stringIn.slice(0,pos);
			if (validDirections.indexOf(start) > -1) {
				// start (left part when slicing around +) is a valid direction input
				// we add start to our return array
				tmp.push(start);
				// we test the right part of stringIn, and add the result to our return array
				var tmpString = stringIn.slice(pos+1); // +1 will omit the "+" around which we spliced from the string to be tested	
				var recurs = [];
				recurs = validatePlus(tmpString);				
				//tmp.concat(validatePlus(tmpString)); // we add the result of the right part of the splice after the input we already tested
				// when calling validatePlus again, we'll normally only go to the else part of test 1, but it will handle stuff like f+f+1 if needed
				tmp = tmp.concat(recurs);
			}
			else {
				// start isn't a direction, so it's either a button or some invalid character
				// invalid characters will be handled later, so we'll treat everything as if it's a button
				// ie we push the whole string into the array as a single input
				tmp.push(stringIn);
			}
		}
		else { // (test 1)
			tmp.push(stringIn);
		}
	}	
	return tmp;	
}

function comboToImage(arr) { // reads an array of valid inputs, and add the corresponding pictures to our <div>
	// <div id="comboVisual">
	var comboString = "<p id='combo' class='combo'>";
	// debug("Contenu de l'array à transformer en image : " + arr.toString());
	var x;
	var inputx;
	var pic;
	for (x in arr) {
		inputx = arr[x];
		pic = "";
		//window.alert("comboToImage, input numéro : " + x +", contenu de inputx entre . : ."+inputx+".");
		if ((validDirections.indexOf(String(inputx))) > -1) { 	// our input is a valid direction 
			switch (String(inputx)) {
				case "f":
					pic = "Images/f.png";
					break;
				case "b":
					pic = "Images/b.png";
					break;
				case "d":
					pic = "Images/d.png";
					break;
				case "d/f":
					pic = "Images/df.png";
					break;
				case "d/b":
					pic = "Images/db.png";
					break;
				case "u/f":
					pic = "Images/uf.png";
					break;
				case "u/b":
					pic = "Images/ub.png";
					break;
				case "F":
					pic = "Images/holdf.png";
					break;
				case "D/F":
					pic = "Images/holddf.png";
					break;
				case "D/B":
					pic = "Images/holddb.png";
					break;
				case "U/F":
					pic = "Images/holduf.png";
					break;
				case "n":
					pic = "Images/n.png";
					break;
				case ";":
					pic = "Images/into.png";
					break;
				case "ws":
					pic = "Images/ws.png";
					break;
				case "WS":
					pic = "Images/ws.png";
					break;
				// The later "directions" are shortcuts for successive directions, so we'll start writing them down in here
				case "qcf":
					pic = "Images/d.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/df.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/f.png";
					break;
				case "QCF":
					pic = "Images/d.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/df.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/f.png";
					break;
				case "qcb":
					pic = "Images/d.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/db.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/b.png";
					break;
				case "QCB":
					pic = "Images/d.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/db.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/b.png";
					break;
				case "cd":
					pic = "Images/f.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/n.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/d.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/df.png";
					break;
				case "CD":
					pic = "Images/f.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/n.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/d.png";
					comboString = comboString + "<img src="+pic+" alt="+inputx+" />";
					pic = "Images/df.png";
					break;
				default :
					pic = "Images/default.png";
					break;
			}
		}
		else if ((validButtons.indexOf(String(inputx))) > -1) { 	// our input is a valid button combination
			//window.alert("bouton, inputx vaut : " + String(inputx));
			switch (String(inputx)) {
				case "1":
					pic = "Images/1.png";
					break;
				case "2":
					pic = "Images/2.png";
					break;
				case "3":
					pic = "Images/3.png";
					break;
				case "4":
					pic = "Images/4.png";
					break;
				case "1+2":
					pic = "Images/1+2.png";
					break;
				case "1+3":
					pic = "Images/1+3.png";
					break;
				case "1+4":
					pic = "Images/1+4.png";
					break;
				case "2+3":
					pic = "Images/2+3.png";
					break;
				case "2+4":
					pic = "Images/2+4.png";
					break;
				case "3+4":
					pic = "Images/3+4.png";
					break;
				case "1+2+3":
					pic = "Images/1+2+3.png";
					break;
				case "1+2+4":
					pic = "Images/1+2+4.png";
					break;
				case "1+2+3+4":
					pic = "Images/1+2+3+4.png";
					break;
				default :
					pic = "Images/default.png";
					break;
			}
		}
		else {											// our input is neither direction nor button, fuck that noise	
			//window.alert("we're in fuck that noise range");
			pic = "Images/default.png";
		}
		// we have our picture set up, we need to put it somewhere.
		
		comboString = comboString + "<img src="+pic+" alt="+String(inputx)+" />";
	}
	comboString = comboString + "</p>";
	// Adding the button to save our picture
	//comboString = comboString + '<button type="button" id="btnSave" class="btnSave" value="Save PNG"> Save as PNG </button>'
	document.getElementById("comboVisual").innerHTML = comboString;
}