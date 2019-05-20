import React, { Component } from "react"
import { FormattedMessage } from "react-intl"

export class Partida extends Component {
  //<button className="btn btn-danger btn-lg btn-block" onClick={handleDeletePartida}>Borrar</button>
  //<Link className="btn btn-warning btn-lg btn-block" to={"/partidas/api/put/" + partida._id}>Actualizar</Link>
  render() {
    const { partida, usuarios } = this.props
    return (
      <React.Fragment>


        <table
          style={{
            fontSize: "25px",
            fontFamily: "Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
            lineHeight: "1.2"
          }}
          className="table table">
          <thead style={{ color: "#0069D1" }}>
            <tr>
              <th>#</th>
              <th className="th-lg">ID</th>
              <th className="th-lg">
                <FormattedMessage id="Toolbar.usuario" defaultMessage="UserName" />
              </th>
              <th className="th-lg">
                <FormattedMessage id="Toolbar.correo" defaultMessage="Mail" />
              </th>
              <th className="th-lg">
                <FormattedMessage id="Partida.puntaje" defaultMessage="Puntaje" />
              </th>
            </tr>
          </thead>
          <tbody>
            {partida.puntajes.map((puntaje, index) => (
              <tr className="blog" key={index}>
                <th scope="row">{index}</th>
                <td>{partida.idUsuarios[index]}</td>
                <td>{usuarios[partida.idUsuarios[index] - 1].username}</td>
                <td>{usuarios[partida.idUsuarios[index] - 1].email}</td>
                <td>{puntaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default Partida
