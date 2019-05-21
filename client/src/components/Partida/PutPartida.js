import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

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
    getFecha = () => {
        var d = Date(Date.now());

        return d.toString()
    }

    render() {

        const { handlePutBlog } = this.props
        const { materias, titulo, descripcion } = this.state
        return (
            <div className="row">
                <Link className="btn btn-warning blog btn-lg btn-block" to="/blogs">
                    Return to blogs
        </Link>
                <div className="col-lg-8 col-md-10 mx-auto">
                    <h1 className="blog">Actualizar Blog</h1>
                    <div className="row">
                        <div className="col-lg-4">
                            <p className="blogDesc">Titulo del Blog:</p>
                        </div>
                        <div className="col">
                            <input onChange={this.onChange} value={titulo} className="form-control" type="text" name="titulo" id="postTitulo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <p className="blogDesc">Descripcion del Blog (Puede Compilar MarkDown):</p>
                        </div>
                        <div className="col">
                            <textarea style={{ height: "500px" }} onChange={this.onChange} value={descripcion} className="form-control" type="text" name="descripcion" id="PostDescripcion" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <p className="blogDesc">Materias:</p>
                        </div>
                        <div className="col">
                            {materias.map((materia, materiaIndex) => (
                                <p className="mat"><input type="radio" name="PostMaterias" id="PostMaterias" />{materia.name}</p>
                            ))}

                        </div>
                    </div>
                    <Link onClick={() => handlePutBlog({ titulo: titulo, descripcion: descripcion, date: " (Modified) " + this.getFecha() }, this.props.match.params.id)} className="btn btn-success btn-lg btn-block" to="/blogs">Actualizar Blog</Link>

                </div>
            </div>
        )
    }
}

export default PutBlog
