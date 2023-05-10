
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
let loiRouge = 0;
let loiVert = 0;
let loiBleu = 0;

//------couleurs définies par l'utilisateur (carreFind)
let redValue = 0;
let greenValue = 0;
let blueValue = 0;

let chance = 0;


//debug
let redLoi = 102;
let greenLoi = 51;
let blueLoi = 153;






document.addEventListener('DOMContentLoaded', function () {
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


		id = "carre_color_set"
		//param = les couleurs définie par les lois
		changerCouleur(redLoi, greenLoi, blueLoi, id)
	});



	//entrée les valeurs de couleurs
	document.querySelector('.couleur_joueur').addEventListener('submit', function (event) {
		event.preventDefault();
		let redValue = document.getElementById('red').value;
		let greenValue = document.getElementById('green').value;
		let blueValue = document.getElementById('blue').value;

		id = "carre_color_find"

		if (chance < 5) {
			changerCouleur(redValue, greenValue, blueValue, id);
			verifWin(redValue, greenValue, blueValue);
			chance++
			console.log(chance)
		} else {
			alert("Vous avez utilisé le nombre maximal d'essai !")
		}
	})

	//reset tous les champs rempli si recommencer clicked
	document.querySelector('.button_recommencer').addEventListener('click', function (event) {
		const formulaireLoi = document.querySelector('.form_choix_loi');
		formulaireLoi.reset();

		const formulaireCouleur = document.querySelector('.couleur_joueur');
		formulaireCouleur.reset();

		const carreSet = document.querySelector('#carre_color_Set');
		carreSet.style.backgroundColor = '';

		const carreFind = document.querySelector('#carre_color_find');
		carreFind.style.backgroundColor = '';

		chance = 0;
	});
});

function changerCouleur(redValue, greenValue, blueValue, id) {
	let newColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
	const carre = document.querySelector(`#${id}`);
	carre.style.backgroundColor = newColor;
}

function verifWin(redValue, greenValue, blueValue) {
	if (redLoi == redValue && greenLoi == greenValue && blueLoi == blueValue) {
		alert('Victoire !');
	}
}


// function calculPoint(redValue, greenValue, blueValue, redLoi, greenLoi, blueLoi) {

// }


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
//les valeurs sont bizarres
function loi_poisson(lambda) {
	let Sk = 0
	let U = Math.random() //U
	let k = 0
	let prob = (Math.pow(lambda, k) / fact(k)) * Math.exp(-lambda)

	while (U > Sk) {
		Sk += prob
		k++
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
	let k = 0

	while (U > Sk) {
		Sk += 1 / N
		k++
	}
	console.log("U = ", U, "proba unif : ", k, "Espérance = ", esp_uniforme(N))
	return k
}




//LOI BETA CONTINUE PAR METHODE DU REJET
function esp_beta(a, b) {
	return a / a + b
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

			console.log("U = ", u, " V = ", v, "loi beta : ", result, "Espérance = ", esp_beta(a, b))
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


// displayBinom(15, 0.3, 100000)
// displayGeom(0.4)
// displayUnif(10)

loi_poisson(5)
loi_uniforme(255)
loi_beta(0.5, 0.5)
