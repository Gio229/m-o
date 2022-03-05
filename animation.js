let agrandir = document.querySelector('.agrandir') ;
let containerFirst = document.querySelector('.containerfirst') ;
let retrecir = document.querySelector('.retrecir') ;
let i = 2 ;




    agrandir.addEventListener('click', ()=>{
        containerFirst.style.display = 'none' ;
    })
 
    retrecir.addEventListener('click', ()=>{
        containerFirst.style.display = 'block' ;     
    })


