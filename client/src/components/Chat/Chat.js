import React, { Component, Fragment } from "react";
import axios from "axios";
import Comentario from "./Comentario";
import { FormattedMessage } from 'react-intl';

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      comentLoad: false,
      nuevoComentario: "",
      authHeader: "Team01 " + String(localStorage.getItem('USERTOKEN')).replace('\n','').trim(),
      hovered: false
    };
  }

  componentDidMount() {
    axios.get("https://team01back.herokuapp.com/chats/" + this.props.idChat).then(res => {
      this.setState({ chat: res.data });
      this.setState({ comentLoad: true });
    });
  }

  postComentario = comentario => {
    console.log(comentario)
    const { chat } = this.state;
    var colorr = chat.color;
    if (comentario[0] === "#") {
      console.log("entra 1")
      colorr = comentario;
    } else {
      
      chat.comentarios.push({ idUsuario: localStorage.getItem("username"), comentario: comentario });
      console.log(chat.comentarios)
     
    }
    var newChat = {
      _id: chat._id,
      color: colorr,
      enabled: chat.enabled,
      comentarios: chat.comentarios
    };

    
    axios.put(`https://team01back.herokuapp.com/chats/${chat._id}`, newChat, {
      headers: {
                  authorization: this.state.authHeader
              }
  }).then(res => {
      this.setState({ chat: res.data });
    });
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onChangeColor = e => {
    this.postComentario(e.target.value);
  };

  LightenDarkenColor = () => {
    var col = this.state.comentLoad ? this.state.chat.color : "#ffffff";
    var amt = 100;
    var usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return {
      backgroundColor:
        (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
    };
  };

  render() {
    const { chat, comentLoad, nuevoComentario } = this.state;
    return (
      <Fragment>
        <div>
          <hr style={{ backgroundColor: "#fff", borderTop: "2px dashed #8c8b8b" }} />
          <h1 className="blog" style={{ textAlign: "center" }}>
            {" "}
            <FormattedMessage
              id="Chat.comentarios"
              defaultMessage="Comentarios"
            />{" "}
          </h1>
          {comentLoad &&
            chat.comentarios.map((comentario, comentarioIndex) => (
              <Comentario comentario={comentario} key={comentarioIndex} />
            ))}
          <hr style={{ backgroundColor: "#fff", borderTop: "2px dashed #8c8b8b" }} />
          <h1 className="blog" style={{ textAlign: "center" }}>
            <FormattedMessage
              id="Chat.añadir"
              defaultMessage="Añadir Nuevo Comentario"
            />
          </h1>
          <hr style={{ backgroundColor: "#fff", borderTop: "2px dashed #8c8b8b" }} />
          {localStorage.getItem("login") === "true" && <React.Fragment>
            <label>.
          <textarea title="añadir" placeholder={window.navigator.language === "es" ? "Escriba su comentario aqui" : "Type your comment here"} className="coment form-control" type="text" name="nuevoComentario" value={nuevoComentario} onChange={this.onChange} >

              </textarea>
            </label>
            <button className="btn btn-success btn-lg btn-block" onClick={() => this.postComentario(nuevoComentario)}>
              <p style={{ color: "black" }}>
                <FormattedMessage
                  id="Chat.añadir"
                  defaultMessage="Añadir Nuevo Comentario"
                />
              </p>
            </button></React.Fragment>}
        </div>
      </Fragment>
    );
  }
}

export default Chat;
