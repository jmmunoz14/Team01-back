import React, { Component, Fragment } from 'react'
import Partida from "./Partida";
import BarChart from "./BarChart";


import PostPartida from './PostPartida'
import PutPartida from './PutPartida'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

export class Partidas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partidas: [],
            chats: [],
            usuarios: [],
            cargaUsuarios: false,
            cargatodos: false,
            todos: [],
            data: [
                { year: 2012, percent: 10 },
                { year: 2013, percent: 20 },
                { year: 2014, percent: 30 },
                { year: 2015, percent: 40 },
                { year: 2016, percent: 50 },
                { year: 2017, percent: 60 },
                { year: 2018, percent: 70 },
                { year: 2019, percent: 80 },
                { year: 2020, percent: 90 },
                { year: 2021, percent: 100 },
            ],
            backCargado : false,
            backCargado2 : false,
            
        }
    }
    componentDidMount = () => {
        axios
            .get('http://localhost:3000/partidas')
            .then(res => {
                this.setState({ partidas: res.data })
                var acc = [];
                const todos = res.data.map((partida, indexP) =>

                    partida.puntajes.map((puntaje, index) => {

                        var rObj = {};
                        rObj["id"] = partida.idUsuarios[index];
                        rObj["puntaje"] = puntaje;
                        rObj["partida"] = partida.idJuego;


                        acc.push(rObj)
                    })
                );
                this.setState({ todos: todos })
                this.setState({ cargatodos: true , backCargado:true})
                console.log(acc);
            })
        axios
            .get('http://localhost:3000/api/obtainall')
            .then(res => {
                this.setState({ usuarios: res.data })
                this.setState({ cargaUsuarios: true , backCargado2: true})
            })
    }




    handlePostPartida = partida => {
        var chat = {
            color: '#e786d1',
            enabled: true,
            comentarios: []
        }
        axios.post('http://localhost:3000/chats', chat).then(res => {
            this.setState({ chats: [...this.state.chats, res.data] })
            var partidanew = {
                idUsuarios: partida.idUsuarios,
                puntajes: partida.puntajes,
                idJuego: partida.idJuego,
                finalizado: partida.finalizado,
                idChat: this.state.chats[this.state.chats.length - 1].chatCreada._id
            }
            axios
                .post('http://localhost:3000/partidas', partidanew)
                .then(res => this.setState({ partidas: [...this.state.partidas, res.data] }))
        })
    }

    handleDeletePartida = (id, idChat) => {
        axios.delete(`http://localhost:3000/partidas/${id}`).then(res =>
            this.setState({
                partidas: [...this.state.partidas.filter(partida => partida._id !== id)]
            })
        )

        axios.delete(`http://localhost:3000/chats/${idChat}`).then(res =>
            this.setState({
                chats: [...this.state.chats.filter(chat => chat._id !== idChat)]
            })
        )
    }

    handlePutPartida = (partida, id) => {
        const { partidas } = this.state
        axios.put(`http://localhost:3000/partidas/${id}`, partida).then(res =>
            this.setState({ partidas: [...partidas.splice(partidas.indexOf(partidas.find(partida => partida._id === id)), 1, res.data)] })
        )
    }

    //<Link className="btn btn-success btn-lg btn-block" to="/partidas/api/post">Añadir Nuevo Partida</Link>

    render() {
        const { partidas, usuarios } = this.state
        /*var rObj = {};
       rObj["id"] = usuarios[partida.idUsuarios[index] - 1].username;
       rObj["puntaje"] = puntaje;
       rObj["email"] = usuarios[partida.idUsuarios[index] - 1].email;
       return rObj;*/
       if(!this.state.backCargado || !this.state.backCargado2){
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
            <Fragment>
                <h1 className="blog" style={{ color: '#0069D1' }}>
                    <FormattedMessage
                        id="Partida.titulo"
                        defaultMessage="Partidas en Curso"
                    />
                </h1>





                {this.state.cargaUsuarios && partidas.map((partida, partidaIndex) => (
                    <div className="row">
                        <div className="col-lg-3">
                        </div>
                        <div className="col-lg-6" style={{ height: "600px" }}>

                            <BarChart usuarios={usuarios} partida={partida} maxVal={50} key={partidaIndex} llave={partidaIndex} />


                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                ))}



                <Route exact path='/partidas/api/post' render={props => (
                    <Fragment>
                        <PostPartida {...props} handlePostPartida={partida => this.handlePostPartida(partida)} />
                    </Fragment>
                )}
                />

                <Route exact path='/partidas/api/put/:id' render={props => (
                    <Fragment>
                        <PutPartida {...props} handlePutPartida={(partida, id) => this.handlePutPartida(partida, id)} />
                    </Fragment>
                )}
                />
            </Fragment>
        )
    }
}

export default Partidas
                                //</Fragment><Partida usuarios={usuarios} partida={partida} partidaIndex={partidaIndex} key={partidaIndex} handleDeletePartida={() => this.handleDeletePartida(partida._id, partida.idChat)} />))}
