function binom(n, p){
    let Sk = 0
    let U = Math.random() //U
    let k=0

    while(U>Sk){
            Sk += prob_binom(k, n, p)
            k++

    }
    

    return k
}

function tabProba(){
    var tabProba =[]
    for(let i = 0; i < 15; i++){
        tabProba[i]=prob_binom(i, 15, 0.3)
    }

    
    
    console.log("tab proba : ", tabProba)
}

function tabFreq(){
    var tabFreq=[]
    const nbExperience = 100000
    for(let i = 0; i<15; i++){
        tabFreq[i]= 0
    }
    
    for(let rep = 0; rep < nbExperience; rep++){
        let indice = binom(15, 0.3)
        let val = tabFreq[indice]
        tabFreq[indice]=val+1

    }

    for(let i = 0; i<15; i++){
        tabFreq[i]= tabFreq[i]/nbExperience
    }

    console.log("tab fred : ", tabFreq)

    

}

console.log(binom(15, 0.3))