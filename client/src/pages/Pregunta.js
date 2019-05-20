import React, { Component } from 'react'
import { origen } from '../helper/config.js'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl';
import Swal from 'sweetalert2'

class Pregunta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preguntaas:
                [
                    {
                        id: '',
                        materia: '',
                        respuesta: '',
                        idioma: ''
                    }

                ],
            currentQuestion: 0,
            respuestasCorrectas: 0,
            backCargado: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        if (window.navigator.language.startsWith("en")) {
            fetch(origen + '/api/allquestionen')
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
        else {
            fetch(origen + '/api/allquestiones')
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

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    add(i) {
        return i + 1;
    }

    handleSubmit(event) {
        if (this.state.value === this.state.preguntaas[this.state.currentQuestion].respuesta) {
            this.setState((respuestasCorrectas) => ({ respuestasCorrectas: this.state.respuestasCorrectas + 1 }),
                () => {
                    if (window.navigator.language.startsWith("es")) {
						var done = 'Respuesta Correcta'
						
                         Swal.fire(
                            done,
                            ":)",
                            'success'
                        )
                    }
                    else {
                        var done = 'Correct Answer'
						
                         Swal.fire(
                            done,
                            ":)",
                            'success'
                        )
                    }
                })
            if (this.state.currentQuestion < this.state.preguntaas.length - 1) {
                this.setState({ currentQuestion: this.state.currentQuestion + 1, value: '' })
            }
            else {
				
                if (window.navigator.language.startsWith("es")) {
					console.log(navigator.language)
                    var done = 'Fin de las preguntas, inciando prueba de nuevo'
						
                         Swal.fire(
                            done,
                            "",
                            'success'
                        )
						alert(done)
                }
                else {
                    
					var done = 'End of answers, restarting'
						
                         Swal.fire(
                            done,
                            "",
                            'success'
                        )
						alert(done)
                }

                this.setState({ currentQuestion: this.state.currentQuestion - this.state.currentQuestion, value: '' })
                this.setState({ respuestasCorrectas: this.state.respuestasCorrectas - this.state.respuestasCorrectas, value: '' })
            }


        }
        else {
            if (window.navigator.language.startsWith("es")) {
                var done = 'Respuesta incorrecta'
						
                         Swal.fire(
                            done,
                            ":(",
                            'error'
                        )
            }
            else {
                var done = 'Wrong Answer'
						
                         Swal.fire(
                            done,
                            ":(",
                            'error'
                        )
            }
        }
        event.preventDefault();
    }

    render() {
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
        }else if (localStorage.getItem("login") !== "true") {
            return (

                <div className='todo'>
                    <div className='quiz'>
                        Quíz
                                </div>
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title"><FormattedMessage id="NoSesion" /></h1>
                        </div>
                    </div>
                </div>
            )
        }
        else {


            return (

                <div className='todo'>
                    <div className='quiz'>
                        Quíz
                </div>

                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title"><FormattedMessage id="Pregunta:" /></h1>

                            <div className='preguntaText'>
                                <p className="card-text">{this.state.preguntaas[this.state.currentQuestion].enunciado}</p>

                            </div>

                            <form onSubmit={this.handleSubmit}>

                                <label ><p className='respuestatext' id="res"><FormattedMessage id="Respuesta:" /></p>
                                    <FormattedMessage id="ingrese" defaultMessage="Ingrese su respuesta">

                                        {placeholder => <Input type="text" id="respuesta" value={this.state.value} onChange={this.handleChange}
                                            placeholder={placeholder} />}

                                    </FormattedMessage>

                                </label>
                                <Button className='boton'><FormattedMessage id="Enviar" /></Button>
                            </form>
                        </div>
                    </div>

                </div>


            )
        }
    }
}

export default Pregunta;