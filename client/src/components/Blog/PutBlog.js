import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { FormattedMessage } from 'react-intl';

export class PutBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materias: [],
            titulo: "",
            descripcion: "",
        }
    }


    componentDidMount = () => {
        axios
            .get('https://team01back.herokuapp.com/materias')
            .then(res => this.setState({ materias: res.data }))

        axios
            .get('https://team01back.herokuapp.com/blogs/' + this.props.match.params.id)
            .then(res => {
                this.setState({ titulo: res.data.titulo })
                this.setState({ descripcion: res.data.descripcion })
            })
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {

        const { handlePutBlog } = this.props
        const { materias, titulo, descripcion } = this.state
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
                            id="Blog.put"
                            defaultMessage="Actualizar Blog"
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
                                <p className="mat"><input type="radio" name="PostMaterias" id="PostMaterias" />{window.navigator.language.startsWith("es") ? materia.nameEs : materia.nameEn}</p>
                            ))}

                        </div>
                    </div>
                    <Link onClick={() => handlePutBlog({ titulo: titulo, descripcion: descripcion, date: Date.now() }, this.props.match.params.id)} className="btn btn-success btn-lg btn-block" to="/blogs">
                        <FormattedMessage
                            id="Blog.put"
                            defaultMessage="Actualizar Blog"
                        />
                    </Link>

                </div>
            </div>
        )
    }
}

export default PutBlog
