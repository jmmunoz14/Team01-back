import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export class PostPartida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idJuego: 1,
      usuarios: [],
    };
  }

  componentDidMount = () => {
    axios
      .get('https://team01back.herokuapp.com/api/obtainall')
      .then(res => this.setState({ usuarios: res.data }))
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });
  getFecha = () => {
    var d = Date(Date.now());

    return d.toString();
  };

  render() {
    const { handlePostPartida } = this.props;
    const { usuarios, idJuego } = this.state;
    return (
      <div className="row">
        <Link className="btn btn-warning partida btn-lg btn-block" to="/partidas">
          Return to partidas
        </Link>
        <div className="col-lg-8 col-md-10 mx-auto">
          <h1 className="partida">Post Partida</h1>
          <div className="row">
            <div className="col-lg-4">
              <p className="partidaDesc">Titulo del Partida:</p>
            </div>
            <div className="col">
              <input onChange={this.onChange} value={idJuego} className="form-control" type="text" name="idJuego" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <p className="partidaDesc">Usuarios:</p>
            </div>
            <div className="col">
              {usuarios.map((usuario, usuarioIndex) => (
                <p className="mat"><input type="radio" name="PostMaterias" id="PostMaterias" />{usuario.username}</p>
              ))}
            </div>
          </div>
          <Link onClick={() => handlePostPartida({
            finalizado:false,idJuego: idJuego, puntajes:[0],
            idUsuarios: [100]
          })
          }
            className="btn btn-success btn-lg btn-block" to="/partidas">
            Crear Partida
          </Link>
        </div>
      </div>
    );
  }
}

export default PostPartida;
