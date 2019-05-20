import React, { Component } from "react";

export class Habilidad extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    setupHabilidad(hab){
        
        if(navigator.language.includes("en")){
            return {
                name : hab.nameEn,
                short: hab.shortName,
                img: hab.img,
                desc: hab.descEn, 
            }
        }
        return {
            name : hab.nameEs,
            short: hab.shortName,
            img: hab.img,
            desc: hab.descEs, 
        }
    }

    handleClick(){
        this.props.onSeleccion(this.props.habilidad);
    }

    render() {
        
        if(this.props.habilidad==null){
            return null;
        }

        const habilidad = this.setupHabilidad(this.props.habilidad);

        return(
                <div className="card text-center p-4 mx-auto my-3" 
                        style={{width: 16 + "rem"}}
                        onClick={this.handleClick}> 
                    <img className="card-img-top mb-3" src={"images/habilidades/" +habilidad.img} 
                    alt={navigator.language.includes("en")
                    ? "Image of the skill " + habilidad.name
                    :"Imágen de la habilidad " + habilidad.name}/>
                    <div className="card-title">
                        {habilidad.name}
                    </div>
                </div>
            
        );
    }


}

export default Habilidad