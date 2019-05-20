import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

export class HabilidadPage extends Component{
    constructor(props) {
        super(props);
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
        this.props.onClose(null);
    }

    render(){
        if(this.props.habilidad==null){
            return null;
        }
        const habilidad = this.setupHabilidad(this.props.habilidad);
        return(
            <div className="page" id="selectedItem">
            <button 
                type="button" 
                className="close"  
                aria-label={navigator.language.includes("en")
                    ? "Close"
                    :"Cerrar"}
                onClick={this.handleClick}>
                <span aria-hidden="true">&times;</span>
            </button>
                <h1> {habilidad.name}</h1>
                <h2> {habilidad.desc}</h2>
                <u>
                    <a href="/quiz" action="replace" className="click-quiz">
                    <h3>
                            <FormattedMessage
                                id = "Habilidad.clickQuiz"
                                defaultMessage = "Haz click aquí para ir al único quiz disponible"
                            />
                    </h3>
                    </a>
                </u>
            </div>

        );
    }

    
} 

export default HabilidadPage