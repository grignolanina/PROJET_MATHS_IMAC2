
// /**
//  * 
//  * 				INTERACTION JOUEUR
//  * 
//  * */
//pour récup les données rentrées par l'utilisateur
//on attend que le dom charge pour que ça fonctionne bien

/**
 * initialisation des valeurs 
 */
//------couleurs définie par les lois (carreSet)
let loiRouge = " ";
let loiVert = " ";
let loiBleu = " ";

let redToFind = 0
let greenToFind = 0
let blueToFind = 0

//------couleurs définies par l'utilisateur (carreFind)
let redValue = 0;
let greenValue = 0;
let blueValue = 0;

let chance = 0;


//debug
// let redLoi = 102;
// let greenLoi = 51;
// let blueLoi = 153;

//Paramètres pour les lois
let lambda = 5
let a = 0.5
let b = 0.5
let N = 256

let n = 4
let p = 0.5

//loi logistique
const position = 127.5
const echelle = 25


document.addEventListener('DOMContentLoaded', function () {
	//taille carré
	let taille = tailleCouleur(n, p)
	console.log("taille : " + taille)
	// let tailleFind = tailleCouleur(n, p)
	const carreSet = document.querySelector('#carre_color_set')
	const carreFind = document.querySelector('#carre_color_find')
	carreSet.style.height = taille
	carreSet.style.width = taille
	carreFind.style.height = taille
	carreFind.style.width = taille

	//choix des lois
	const form = document.querySelector('.form_choix_loi');
	form.addEventListener('submit', function (event) {
		event.preventDefault();

		loiRouge = document.querySelector('input[name="rouge"]:checked');
		loiVert = document.querySelector('input[name="vert"]:checked');
		loiBleu = document.querySelector('input[name="bleu"]:checked');

		if (loiRouge && loiVert && loiBleu) {
			const rougeLoiValue = loiRouge.value; //type de loi à utiliser
			const vertLoiValue = loiVert.value;
			const bleuLoiValue = loiBleu.value;
			console.log(`Rouge : ${rougeLoiValue}, Vert : ${vertLoiValue}, Bleu : ${bleuLoiValue}`);
		}
		//debug à add après
		// } else {
		// 	alert('Veuillez sélectionner une loi pour chaque couleur.');
		// }


		/**
		 * rajouter ici toutes l'attribution des couleurs par les lois
		 */
		redToFind = valeurCouleur(loiRouge)
		greenToFind = valeurCouleur(loiVert)
		blueToFind = valeurCouleur(loiBleu)

		console.log("r : ", redToFind, "g : ", greenToFind, "b : ", blueToFind)


		id = "carre_color_set"
		//param = les couleurs définie par les lois
		changerCouleur(redToFind, greenToFind, blueToFind, id)
	});



	//entrée les valeurs de couleurs
	document.querySelector('.couleur_joueur').addEventListener('submit', function (event) {
		event.preventDefault();
		let redValue = parseInt(document.getElementById('red').value);
		let greenValue = parseInt(document.getElementById('green').value);
		let blueValue = parseInt(document.getElementById('blue').value);


		let nbChance = document.getElementById("chance")



		id = "carre_color_find"

		if (chance < 10) {
			changerCouleur(redValue, greenValue, blueValue, id);
			verifWin(redValue, greenValue, blueValue, redToFind, greenToFind, blueToFind);
			checkRouge();
			checkVert();
			checkBleu();
			chance++;
			nbChance.textContent = "Nombre d'essai(s) restant(s) : " + (10 - (chance))
			console.log(chance)
		} else {
			alert("Vous avez utilisé le nombre maximal d'essai !")
			nbChance.textContent = "Relancer une partie pour re tester votre chance !"
		}
	})

	//reset tous les champs rempli si recommencer clicked
	document.querySelector('.button_recommencer').addEventListener('click', function (event) {
		const formulaireLoi = document.querySelector('.form_choix_loi');
		formulaireLoi.reset();

		const formulaireCouleur = document.querySelector('.couleur_joueur');
		formulaireCouleur.reset();

		const carreSet = document.querySelector('#carre_color_set');
		carreSet.style.backgroundColor = '';

		const carreFind = document.querySelector('#carre_color_find');
		carreFind.style.backgroundColor = '';

		chance = 0;
	});
});

//retourne un entier entre 0 et 255 correspondant à la loi selectionnée
function valeurCouleur(loiCouleur) {
	if (loiCouleur.value == 'poisson') {
		loiCouleur = loi_poisson(lambda)
	}
	else if (loiCouleur.value == 'beta') {
		loiCouleur = loi_beta(a, b)
	}
	else if (loiCouleur.value == 'uni') {
		loiCouleur = loi_uniforme(N)
	}
	//à changer avec la dernière loi
	else if (loiCouleur.value == 'logis') {
		loiCouleur = loi_logistique(position, echelle)
	}
	return loiCouleur
}

function changerCouleur(redValue, greenValue, blueValue, id) {
	let newColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
	const carre = document.querySelector(`#${id}`);
	carre.style.backgroundColor = newColor;
}

function verifWin(redValue, greenValue, blueValue, r, g, b) {
	if (r == redValue && g == greenValue && b == blueValue) {
		alert('Victoire !');
	}
}

function checkRouge() {
	const rouge = document.getElementById("red").value
	const indicationRouge = document.getElementById("indicationRouge")

	let result = redToFind - rouge

	if (result < 0) {
		indicationRouge.textContent = "-"
	} else if (result > 0) {
		indicationRouge.textContent = "+"
	} else {
		indicationRouge.textContent = "="
	}
}
function checkVert() {
	const vert = document.getElementById("green").value
	const indicationVert = document.getElementById("indicationVert")

	let result = greenToFind - vert

	if (result < 0) {
		indicationVert.textContent = "-"
	} else if (result > 0) {
		indicationVert.textContent = "+"
	} else {
		indicationVert.textContent = "="
	}
}
function checkBleu() {
	const bleu = document.getElementById("blue").value
	const indicationBleu = document.getElementById("indicationBleu")

	let result = blueToFind - bleu

	if (result < 0) {
		indicationBleu.textContent = "-"
	} else if (result > 0) {
		indicationBleu.textContent = "+"
	} else {
		indicationBleu.textContent = "="
	}
}

// /**
//  * 
//  * 
//  * 				MATHS
//  * 
//  * */
function fact(nbr) {
	var i, nbr, f = 1;
	for (i = 1; i <= nbr; i++) {
		f = f * i;   // ou f *= i;
	}
	return f;
}



//n nombre d'essai
//p prob

//methode pour prog
//je prends 1: 0
//je balance mon rand 
//si rand > p0 j'add p1
//si rand > p0 +p1 je rajouter p2
//si rand < p0 + p1 + p2 
//je dis que mon rand c'est p3

//au lieu de faire pleins de test sur chaque bout
//je fais une boucle jusqu'à ce que je dépasse



function prob_binom(k, n, p) {
	return (fact(n) / (fact(k) * fact(n - k))) * Math.pow(p, k) * Math.pow((1 - p), (n - k))
}

function binom(n, p) {
	let Sk = 0
	let U = Math.random() //U entre 0 et 1 
	let k = 0

	while (U > Sk) {
		Sk += prob_binom(k, n, p)
		k++

	}
	console.log("U= ", U, "k= ", k)
	return k
}


//défini la taille des carres de couleurs 
function tailleCouleur(n, p) {
	const taillesCouleur = ["très petit", "petit", "moyen", "grand", "très grand"];
	const indice = binom(n, p)
	switch (taillesCouleur[indice - 1]) {
		case ("très petit"):
			return "20px"
			break;
		case ("petit"):
			return "50px"
			break;
		case ("moyen"):
			return "80px"
			break;
		case ("grand"):
			return "110px"
			break;
		case ("très grand"):
			return "150px"
			break;
	}
}



function binomTabProba(n, p) {
	var tabProba = []
	for (let i = 0; i < n; i++) {
		tabProba[i] = prob_binom(i, n, p)
	}
	return tabProba
	//console.log("tab proba : ", tabProba)
}

function binomTabFreq(n, p, nbExperience) {
	var tabFreq = new Array(n).fill(0);

	for (let rep = 0; rep < nbExperience; rep++) {
		//nous renvoie un entier entre 0 et n grâce à la loi binomiale
		let indice = binom(n, p) - 1

		let val = tabFreq[indice]
		tabFreq[indice] = val + 1

	}

	for (let i = 0; i < n; i++) {
		tabFreq[i] = tabFreq[i] / nbExperience
	}

	return tabFreq

	//console.log("tab fred : ", tabFreq)
}



//LOI DE POISSON
function esp_poisson(lambda) {
	return lambda
}
function loi_poisson(lambda) {
	let Sk = 0
	let U = Math.random() //U
	let k = 0
	let prob = (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k)

	while (U > Sk) {
		Sk += prob
		k++
		prob = (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k)
	}

	console.log("U = ", U, "proba poisson : ", k, "Espérance = ", esp_poisson(lambda))
	return k
}



//LOI UNIFORME

//Espérance de la loi uniforme, représente la valeur moyenne
function esp_uniforme(N) {
	return (N + 1) / 2
}

function loi_uniforme(N) {
	let Sk = 0
	let U = Math.random() //U
	let k = -1

	while (U > Sk) {
		Sk += 1 / N
		k++
	}
	console.log("U = ", U, "proba unif : ", k, "Espérance = ", esp_uniforme(N))
	return k
}


function loi_logistique(position,echelle) {
	const U = Math.random();
	const res = Math.round(Math.abs(echelle*Math.log2(U/(1-U)) + position))

	console.log("U =", U, "proba logistique:", res);
	return res;
}


//LOI BETA CONTINUE PAR METHODE DU REJET
function esp_beta(a, b) {
	return a / (a + b)
}

function var_beta(a, b) {
	const numerator = a * b;
	const denominator = Math.pow(a + b, 2) * (a + b + 1);
	return numerator / denominator;
}

function loi_beta(a, b) {
	const MAX_ITERATIONS = 10000; // Nombre maximal d'itérations pour éviter une boucle infinie
	let iteration = 0;

	while (iteration < MAX_ITERATIONS) {
		const u = Math.random(); // Échantillon d'une loi uniforme entre 0 et 1
		const v = Math.random(); // Échantillon d'une loi uniforme entre 0 et 1

		const x = Math.pow(u, 1 / a);
		const y = Math.pow(v, 1 / b);

		if (x + y <= 1) {
			// Accepter l'échantillon
			let result = x / (x + y)


			//Mettre le resultat entre 0 et 255 
			result = Math.round(result * 255)

			console.log("U = ", u, " V = ", v, "loi beta : ", result, "Espérance = ", esp_beta(a, b), "Variance = ", var_beta(a, b))
			return result;
		}

		iteration++;
	}

	// Si aucune valeur acceptée n'a été trouvée après le nombre maximal d'itérations
	console.error("Échec de génération d'un échantillon selon la loi bêta.");
	return null;
}




//FONCTIONS D'AFFICHAGE
function displayGeom(p) {
	let k = geometric(p);
	let prob_k = prob_geometric(p, k)
	console.log("LOI GEOMETRIQUE : ")
	console.log("Numero tiré k = ", k)
	console.log("Probabilité d'avoir k : ", prob_k)
}

function displayBinom(n, p, nbExperience) {
	let k = binom(n, p);
	let tabProbaBinom = binomTabProba(n, p)
	let freqObtenues = binomTabFreq(n, p, nbExperience)
	console.log("LOI BINOMIALE : ")
	console.log("Numero tiré k = ", k)
	console.log("Tableau des probabilité correspondant = ", tabProbaBinom)
	console.log("Tableau des fréquences obtenues = ", freqObtenues)

}


//displayBinom(4, 0.5, 100000)
// displayGeom(0.4)
// displayUnif(10)

// loi_poisson(5)
// loi_uniforme(255)
// loi_beta(0.5, 0.5)
//loi_logistique(127,25)
//tailleCouleur(4,0.5)
