import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

export class MateriaPage extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    setupMateria(mat){
        if(navigator.language.includes("en")){
            return {
                name : mat.nameEn,
                short: mat.shortName,
                img: mat.img,
                desc: mat.descEn, 
            }
        }
        return {
            name : mat.nameEs,
            short: mat.shortName,
            img: mat.img,
            desc: mat.descEs, 
        }
    }

    handleClick(){
        this.props.onClose(null);
    }


    render(){
        if(this.props.materia==null){
            return null;
        }
        const materia = this.setupMateria(this.props.materia);
        return(
            <div className="page" id="selectedItem">
            <button type="button" className="close" 
            aria-label={navigator.language.includes("en")
                    ? "Close"
                    :"Cerrar"} 
            onClick={this.handleClick}>
                <span aria-hidden="true" className="close">&times;</span>
            </button>
                <h1> {materia.name}</h1>
                <h2> {materia.desc}</h2>
                <u>
                    <a href="/quiz" action="replace" className= "click-quiz">
                        <h3>
                            <FormattedMessage
                                id = "Materia.clickQuiz"
                                defaultMessage = "Haz click aquí para ir al único quiz disponible"
                            />
                        </h3>
                    </a>
                </u>

            </div>

        );
    }

    
} 

export default MateriaPage