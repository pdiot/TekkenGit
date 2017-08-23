<!DOCTYPE html>
<?php
/* FONCTIONS */

function gestionplus($array_in){
	/* Gestion du +
pour chaque move
	1) s'il ne contient pas de +, je le mets dans le tableau $géré
	2) s'il contient un +
		3) je détermine s'il s'agit d'un input type f+1 
			si oui je mets f et 1 à la suite dans le tableu $géré
		4) Sinon (ie type 1+2)
			je mets 1+2 dans le tableau $géré

			if ($test = true) {

*/
	$array_out = array();
	$index = 0;
	$arr = array();
	$tmp = array();
	$dir = false;
	
	foreach ($array_in as $move){
	if (strpos($move, '+') !== false)	{ 		// Si on trouve + dans $move (2), strpos ne renverra pas false mais l'index
		$arr = explode("+", $move, 2);
		switch ($arr[0]){ 						// On teste la valeur de la première partie du move (jusqu'au +)
			case 'f':
				$dir=true;
			break;
			case 'b':		
				$dir=true;
				break;
			case 'd':
				$dir=true;
				break;
			case 'd/b':
				$dir=true;
				break;
			case 'd/f':
				$dir=true;
				break;
			case 'u/b':
				$dir=true;
				break;
			case 'u/f':
				$dir=true;
				break;
			default:
				$dir=false;
		}
		if ($dir == true) {								// le premier input est une direction (3)
			$array_out[$index] = $arr[0];		// on ajoute la direction
			$index ++;
			$array_out[$index] = $arr[1];		// on ajoute le reste des inputs, peut contenir des + type 1+2
			$index ++;			
		}
		else {									// le premier input est un bouton (4)
												// on est sur un type 1+2, on doit reconstituer l'input : rajout d'un +
			$array_out[$index] = $arr[0]."+".$arr[1];
			$index ++;
		}
	}		
	else {										// On n'a pas de + dans $move (1)
		$array_out[$index] = $move;
		$index ++;
	}	
	}
	unset($move);
	return $array_out;
}

function listarray($array_in){
	$movenb = 1;
foreach ($array_in as $move) {
	print 'move '.$movenb.' : ';
	echo $move;
	echo "</br>";
	$movenb ++;
	
}
unset($move);
}

function topictures($array_in){
// Traduction des inputs en images 

// encapsulation
	print "<p id='combo' class='combo'>";
	foreach ($array_in as $move) {
	$img = "";
	switch ($move) {								// On lit l'input, on sort l'image associée
		// D'abord les directions
		case 'f':
			$img = "Images/f.png";
			break;
		case 'b':		
			$img = "Images/b.png";
			break;
		case 'd':
			$img = "Images/d.png";
			break;
		case 'd/b':
			$img = "Images/db.png";
			break;
		case 'd/f':
			$img = "Images/df.png";
			break;
		case 'u/b':
			$img = "Images/ub.png";
			break;
		case 'u/f':
			$img = "Images/uf.png";
			break;
		case 'F':
			$img = "Images/holdf.png";
			break;
		case 'UF':
			$img = "Images/holduf.png";
			break;
		case 'DF':
			$img = "Images/holddf.png";
			break;
		case 'DB':
			$img = "Images/holddb.png";
			break;
		// On passe aux boutons			
		case '1':
			$img = "Images/1.png";
			break;
		case '2':
			$img = "Images/2.png";
			break;
		case '3':
			$img = "Images/3.png";
			break;
		case '4':
			$img = "Images/4.png";
			break;
		case '1+2':
			$img = "Images/1+2.png";
			break;
		case '3+4':
			$img = "Images/3+4.png";
			break;
		case '1+3':
			$img = "Images/1+3.png";
			break;
		case '2+4':
			$img = "Images/2+4.png";
			break;
		case '1+4':
			$img = "Images/1+4.png";
			break;
		case '2+3':
			$img = "Images/2+3.png";
			break;
		case '1+2+3':
			$img = "Images/1+2+3.png";
			break;
		case '1+2+4':
			$img = "Images/1+2+4.png";
			break;
		case '1+2+3+4':
			$img = "Images/1+2+3+4.png";
			break;
		case ';':
			$img ='Images/into.png';
			break;
		default :
			$img = "Images/default.png";
			break;
	}
	print '<img src="'.$img.'" alt="'.$move.'" />';	// On print l'image
	
}
	print "</p>";
unset($move);
}

/* main */
function main () {
$test = false;
$incstring = $_GET['combo_string'];
$moves = explode(" ", $incstring);

if ($test == true) {listarray($moves);}

$géré = array();

$géré = gestionplus($moves);

if ($test == true) {listarray($géré);}

topictures($géré);
}



?>
<html>
	<head>
		<meta charset="utf-8" />
        <link rel="stylesheet" href="combo.css" />
        <title>Combo out</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="JS/blob.js"></script>
		<script src="JS/canvas-toblob.js"></script>
		<script src="JS/filesaver.js"></script>
		<script src="JS/html2canvas.js"></script>
		<script src="combos.js"></script>
	</head>
	
	<body>
	<div class="content">
	<?php main();?>
	</div>
	
	<button type="button" onclick="window.open(window.location.href, 'Custom Combo', 'width=1500, height=100, location=no, fullscreen=yes')"> 
	To new window  </button>
	</body>
	
	<button type="button" id="btnSave" class="btnSave" value="Save PNG"> Save PNG </button>

</html>


	
