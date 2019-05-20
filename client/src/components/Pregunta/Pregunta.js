import React, { Component } from 'react'
import { origen } from '../helper/config.js'
import { FormattedMessage } from 'react-intl';

class Pregunta extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
            currentQuestion: 0,
            backCargado :false,
            preguntaas:
            [
                {
                    id: '',
                    materia: '',
                    respuesta: '',
                }

            ],


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        fetch(origen + '/api/allquestion')
            .then((response) => {
                return response.json()
            })
            .then((json) => {

                return json;
            })
            .then((json) => {
                this.setState({ preguntaas: json , backCargado: true});
            });

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.value === this.state.preguntaas[this.state.currentQuestion].respuesta) {
            alert('respuesta correcta')
            this.setState({ currentQuestion: this.state.currentQuestion + 1 })
        }
        else {
            alert('respuesta incorrecta')
        }
        event.preventDefault();
    }

    render() {
        console.log(this.state.backCargado);
        if(!this.state.backCargado){
            return(
                <div className="m-auto">
                    <img  src= "images/loader.gif"
                        alt={
                                navigator.language.includes("en")
                                ? "Loading data:"
                                : "Cargando la información:" 
                            }/>
                    <h1>{
                                navigator.language.includes("en")
                                ? "We're loading the data"
                                : "Estamos cargando la información" 
                            }</h1>
                </div>
            ) ;
        }else
        return (
            <main>
                <div>
                    <div className='quiz'>
                        Quíz
                </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><FormattedMessage id="Pregunta:" /></h5>

                            <div className='preguntaText'>
                                <p className="card-text">{this.state.preguntaas[this.state.currentQuestion].enunciado}</p>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <p>Respuesta:</p>
                                    <input name="res" type="text" required value={this.state.value || ''} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>



                </div>
            </main>
        )
    }
}

export default Pregunta;