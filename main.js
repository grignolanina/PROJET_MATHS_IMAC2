
// /**
//  * 
//  * 				INTERACTION JOUEUR
//  * 
//  * */
//pour récup les données rentrées par l'utilisateur
//on attend que le dom charge pour que ça fonctionne bien
document.addEventListener('DOMContentLoaded', function() {
	//choix des lois
	const form = document.querySelector('.form_choix_loi');
	form.addEventListener('submit', function(event) {
	event.preventDefault();

	const rouge = document.querySelector('input[name="rouge"]:checked');
	const vert = document.querySelector('input[name="vert"]:checked');
	const bleu = document.querySelector('input[name="bleu"]:checked');

	if (rouge && vert && bleu) {
		const rougeValue = rouge.value;
		const vertValue = vert.value;
		const bleuValue = bleu.value;
		console.log(`Rouge : ${rougeValue}, Vert : ${vertValue}, Bleu : ${bleuValue}`);
	} else {
		alert('Veuillez sélectionner une loi pour chaque couleur.');
	}
	});

	//entrée les valeurs de couleurs
	document.querySelector('.couleur_joueur').addEventListener('submit', function(event) {
		event.preventDefault();
		let redValue = document.getElementById('red').value;
		let greenValue = document.getElementById('green').value;
		let blueValue = document.getElementById('blue').value;
		console.log('Rouge:', redValue);
		console.log('Vert:', greenValue);
		console.log('Bleu:', blueValue);
	});	
});

// /**
//  * 
//  * 
//  * 				MATHS
//  * 
//  * */
function prob_binom(k, n, p){
		return (fact(n)/(fact(k)*fact(n-k)))* Math.pow(p,k) * Math.pow((1-p), (n-k))
	}


	
function fact(nbr){
	var i, nbr, f = 1;
	for(i = 1; i <= nbr; i++)  
	{
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

function binom(n, p){
	let Sk = 0
	let U = Math.random() //U entre 0 et 1 
	let k=0

	while(U>Sk){
			Sk += prob_binom(k, n, p)
			k++

	}
	return k
}

function binomTabProba(n,p){
	var tabProba =[]
	for(let i = 0; i < n; i++){
		tabProba[i]=prob_binom(i, n, p)
	}
	return tabProba
	//console.log("tab proba : ", tabProba)
}

function binomTabFreq(n, p, nbExperience){
	var tabFreq = new Array(n).fill(0);
	
	for(let rep = 0; rep < nbExperience; rep++){
		//nous renvoie un entier entre 0 et n grâce à la loi binomiale
		let indice = binom(n, p)-1
		
		let val = tabFreq[indice]
		tabFreq[indice]=val+1

	}

	for(let i = 0; i<n; i++){
		tabFreq[i]= tabFreq[i]/nbExperience
	}

	return tabFreq

	//console.log("tab fred : ", tabFreq)

	

}

function prob_geometric(p,k){
	return p*(Math.pow(1-p, k-1))
}


function geometric(p){
	let Sk = 0
	let U = Math.random() //U
	let k=0

	while(U>Sk){
			Sk += prob_geometric(p, k)
			k++
	}
	console.log("U = ", U ,"proba geo : ", k)
	return k
}

//LOI UNIFORME
function prob_uniform(N){
	return 1/N
}


function uniform(N){
	let Sk = 0
	let U = Math.random() //U
	let k=0

	while(U>Sk){
			Sk += prob_uniform(N)
			
			k++
	}
	console.log("U = ", U ,"proba unif : ", k)
	return k
}

function loi_sqrt(){
	let Sk = 0
	let U = Math.random() //U
	let k=0
	let step = 0.01

	while(U>Sk){
		Sk += Math.sqrt(step)
		step += step
		k++
		console.log("Sk = ", Sk, "Step = ", step)
	}
	console.log("U = ", U ,"k donné : ", k)
	return k
}

//LOI SUR UNE FONCTION DONNEE EN PARAMETRE, ex : sin, sqrt..
function loi_function(func){
	let Sk = 0
	let U = Math.random() //U
	let k=0
	let step = 0.01

	while(U>Sk){
		Sk += func(step)
		step += step
		k++
		console.log("Sk = ", Sk, "Step = ", step)
	}
	console.log("U = ", U ,"k donné : ", k)
	return k
}

//FONCTIONS D'AFFICHAGE
function displayGeom(p){
let k = geometric(p);
let prob_k = prob_geometric(p, k)
console.log("LOI GEOMETRIQUE : ")
console.log("Numero tiré k = " , k)
console.log("Probabilité d'avoir k : ", prob_k)

}

function displayBinom(n, p, nbExperience){
	let k = binom(n,p);
	let tabProbaBinom = binomTabProba(n,p)
	let freqObtenues = binomTabFreq(n,p,nbExperience)
	console.log("LOI BINOMIALE : ")
	console.log("Numero tiré k = " , k)
	// console.log("Tableau des probabilité correspondant = " , tabProbaBinom)
	// console.log("Tableau des fréquences obtenues = " , freqObtenues)

}

function displayUnif(N){
	let k = uniform(N);
	let prob_k = prob_uniform(N)
	console.log("LOI UNIFORME : ")
	console.log("Numero tiré k = " , k)
	console.log("Probabilité d'avoir k : ", prob_k)
	
}

displayBinom(15, 0.3, 100000)
displayGeom(0.4)
displayUnif(10)
	