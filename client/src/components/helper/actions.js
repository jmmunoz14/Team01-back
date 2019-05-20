import {origen} from './config.js'

async function Preguntas(){
   
    fetch (origen+'/api/allquestion')
    .then(response => {return response.json() } )
    .then(jsondata => console.log(jsondata))
   
}


export {Preguntas}