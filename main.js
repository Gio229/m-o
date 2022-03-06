const CLEFAPI = '' ; //<--Your API key right here
let resultatsAPI ;
let temps = document.querySelector(".temps") ;
let temperature = document.querySelector(".temperature") ;
let localisation = document.querySelector(".localisation") ;
let heures = document.querySelectorAll(".h") ;
let heuresPrevisions = document.querySelectorAll(".h-prevision") ;
let jours = document.querySelectorAll(".d") ;
let joursPrevision = document.querySelectorAll(".d-prevision") ;
let image = document.querySelector(".lg") ;
let chargement = document.querySelector(".chargement") ;


if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        //console.log(position) ;
        let long = position.coords.longitude ;
        let lat = position.coords.latitude ;
        AppleAPI(long, lat) ;
    }, () => {
        alert ('svp activer la geolocalisation sinon ça ne marchera pas !') ;
    }
    )
}

let AppleAPI = (long, lat) => {
    //console.log(long, lat) ;
    fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`) 
    .then ((reponse) => {
        return reponse.json() ;
    })
    .then ((data) => {
        console.log (data) ;
        resultatsAPI = data ;
        temps.innerText = resultatsAPI.current.weather[0].description ;
        temperature.innerText = `${resultatsAPI.current.temp}°` ;
        localisation.innerText = resultatsAPI.timezone   ;

        let heureActu = new Date().getHours() ;

        // heure par bon de 3
        for (let i = 0; i < heures.length; i++){
            heureIncre = heureActu + i * 3 ;
            if (heureIncre < 24){
                heures[i].innerText = `${heureIncre} h` ;
            }else if(heureIncre >24){
                heures[i].innerText = `${heureIncre - 24} h` ;
            }else{
                heures[i].innerText = "00 h";
            }
        }

        for (let j = 0; j < heuresPrevisions.length; j++){
            heuresPrevisions[j].innerText = `${resultatsAPI.hourly[j*3].temp}°` ;
        }

        for (let l = 0; l < jourEnOrdre.length; l++){
            joursPrevision[l].innerText = `${resultatsAPI.daily[l].temp.day}°` ;
        }

        if (heureActu > 6 && heureActu <20){
            image.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg` ;
        }else{
            image.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg` ;
        }
        chargement.classList.add('disparition') ;
     }) 
}

// gestion des jours
const joursSem = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] ;
let jourActu = new Date ().toLocaleDateString ('fr-FR', {weekday: 'long'}) ;
jourActu = jourActu.charAt(0).toUpperCase() + jourActu.slice(1) ;
        //console.log (jourActu) ;
let jourEnOrdre = joursSem.slice(joursSem.indexOf(jourActu)).concat(joursSem.slice(0, joursSem.indexOf(jourActu))) ;
        //console.log (jourEnOrdre) ;

for (let k = 0; k < jourEnOrdre.length; k++){
    jours[k].innerText = jourEnOrdre[k] ;
}

