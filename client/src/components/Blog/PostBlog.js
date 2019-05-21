import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FormattedMessage } from 'react-intl';

export class PostBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "Nuevo Blog",
      descripcion: "Descripcion Blog",
      materias: [],
    };
  }

  componentDidMount = () => {
    axios
      .get('https://team01back.herokuapp.com/materias')
      .then(res => this.setState({ materias: res.data }))
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { handlePostBlog } = this.props;
    const { materias, titulo, descripcion } = this.state;
    return (
      <div className="row">
        <Link className="btn btn-info blog btn-lg btn-block" to="/blogs">
          <FormattedMessage
            id="Blog.volver"
            defaultMessage="Volver a Blogs"
          />
        </Link>
        <div className="col-lg-8 col-md-10 mx-auto">
          <h1 className="blog">
            <FormattedMessage
              id="Blog.post"
              defaultMessage="Publicar Nuevo Blog"
            /></h1>
          <div className="row">
            <div className="col-lg-4">
              <p className="blogDesc">
                <FormattedMessage
                  id="Blog.titulo"
                  defaultMessage="Titulo del Blog:"
                />
              </p>
            </div>
            <div className="col">
              <input onChange={this.onChange} value={titulo} className="form-control" type="text" name="titulo" id="postTitulo" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <p className="blogDesc">
                <FormattedMessage
                  id="Blog.descripcion"
                  defaultMessage="Descripcion del Blog (Puede Compilar MarkDown):"
                />
              </p>
            </div>
            <div className="col">
              <textarea style={{ height: "500px" }} onChange={this.onChange} value={descripcion} className="form-control" type="text" name="descripcion" id="PostDescripcion" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <p className="blogDesc">
                <FormattedMessage
                  id="Blog.materias"
                  defaultMessage="Materias:"
                />
              </p>
            </div>
            <div className="col">
              {materias.map((materia, materiaIndex) => (
                <p key={materiaIndex} className="mat"><input type="radio" name="PostMaterias" id="PostMaterias" />{window.navigator.language.startsWith("es") ? materia.nameEs : materia.nameEn}</p>
              ))}

            </div>
          </div>
          <Link onClick={() => handlePostBlog({
            titulo: titulo, idioma: window.navigator.language.substring(0, 2), descripcion: descripcion, date: Date.now(),
            idUsuario: localStorage.getItem("username") + ""
          })
          }
            className="btn btn-success btn-lg btn-block" to="/blogs">
            <FormattedMessage
              id="Blog.post"
              defaultMessage="Publicar Nuevo Blog"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default PostBlog;
