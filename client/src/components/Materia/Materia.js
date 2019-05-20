import React, { Component} from "react";


export class Materia extends Component {
    constructor(props) {
        super(props)
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
        this.props.onSeleccion(this.props.materia);
    }

    render() {
        if(this.props.materia==null){
            return null;
        }

        const materia = this.setupMateria(this.props.materia);

        return(
                <div className="card text-center p-4 mx-auto my-3" 
                    style={{width: 16 + "rem"}}
                    onClick={this.handleClick}>
                    <img className="card-img-top mb-3" src={"images/materias/" +materia.img} 
                    alt={navigator.language.includes("en")
                    ? "Image of the subject " + materia.name
                    :"Imágen de la materia " + materia.name}/>
                    <div className="card-title">
                        {materia.name}
                    </div>
                </div>
            
        );
    }


}

export default Materia