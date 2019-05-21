import React, { Component, Fragment } from 'react'
import Blog from "./Blog";
import { Link } from "react-router-dom"
import PostBlog from './PostBlog'
import PutBlog from './PutBlog'
import BlogDetail from './BlogDetail'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import Swal from 'sweetalert2'
export class Blogs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            materias: [],
            chats: [],
            es: true,
            en: true,
            test: "",
            authHeader: "Team01 " + String(localStorage.getItem('USERTOKEN')).replace('\n','').trim(),
            backCargado: false,
            backCargado2: false

        }
    }

    componentDidMount() {
        axios
            .get('https://team01back.herokuapp.com/blogs')
            .then(res => {
                this.setState({ blogs: res.data, backCargado: true })
            })
        axios
            .get('https://team01back.herokuapp.com/chats')
            .then(res => this.setState({ chats: res.data, backCargado2: true }))
    }

    handlePostBlog = blog => {
        var chat = {
            color: '#e786d1POST',
            enabled: true,
            comentarios: []
        }

        axios.post('https://team01back.herokuapp.com/chats', chat, {
            headers: {
                        authorization: this.state.authHeader
                    }
        }).then(res => {

            this.setState({ chats: [...this.state.chats, res.data] })

            var blognew = {
                titulo: blog.titulo,
                descripcion: blog.descripcion,
                idUsuario: blog.idUsuario,
                date: blog.date,
                idChat: this.state.chats[this.state.chats.length - 1].chatCreada._id,
                comentarios: [{ idUsuario: blog.idUsuario, comentario: 'tested' }],
                idioma: blog.idioma
            }


            axios
                .post('https://team01back.herokuapp.com/blogs', blognew, {
                        headers: {
                                    authorization: this.state.authHeader
                                }
                    })
                .then(res => {
                    console.log(res.statusText);
                    console.log('config', res.config);

                    this.setState({ blogs: [...this.state.blogs, res.data] })

                    var done = "Done!"
                    var blog = 'Your Blog has been created!'

                    if (window.navigator.language.startsWith("es")) {
                        done = "Listo!"
                        blog = "Tu Blog ha sido creado"
                    }
                    Swal.fire(
                        done,
                        blog,
                        'success'
                    ).then((result) => {
                        if (result.value) {
                            window.location.reload()
                        }
                    })
                })
        })
    }

    handleDeleteBlog = (id, idChat) => {

        var sure = 'Are you sure?'
        var revert = "You won't be able to revert this!"
        var confirm = 'Yes, delete it!'
        var delet = "Deleted!"
        var deletedd = "Your Blog has been deleted."
        if (window.navigator.language.startsWith("es")) {
            sure = "¿Estás seguro?"
            revert = "No es posible revertir este cambio"
            confirm = " Si, Borrarlo"
            delet = "Borrado!"
            deletedd = "Tu Blog ha sido borrado."
        }

        Swal.fire({
            title: sure,
            text: revert,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirm
        }).then((result) => {
            if (result.value) {
                axios.delete(`https://team01back.herokuapp.com/blogs/${id}`, {
                    headers: {
                                authorization: this.state.authHeader
                            }
                }).then(res =>
                    this.setState({
                        blogs: [...this.state.blogs.filter(blog => blog._id !== id)]
                    })
                )

                axios.delete(`https://team01back.herokuapp.com/chats/${idChat}`, {
                    headers: {
                                authorization: this.state.authHeader
                            }
                }).then(res => {
                    this.setState({ chats: [...this.state.chats.filter(chat => chat._id !== idChat)] })
                    Swal.fire(
                        delet,
                        deletedd,
                        'success'
                    )
                }
                )

            }
        })


    }

    handlePutBlog = (blog, id) => {
        const { blogs } = this.state
        axios.put(`https://team01back.herokuapp.com/blogs/${id}`, blog, {
            headers: {
                        authorization: this.state.authHeader
                    }
        }).then(res => {
            this.setState({ blogs: [...blogs.splice(blogs.indexOf(blogs.find(blog => blog._id === id)), 1, res.data)] })
            var done = "Done!"
            var blog = 'Your Blog has been updated!'
            if (window.navigator.language.startsWith("es")) {
                done = "Listo!"
                blog = "Tu Blog ha sido actualizado"
            }
            Swal.fire(
                done,
                blog,
                'success'
            ).then((result) => {
                if (result.value) {
                    window.location.reload()
                }
            })
        }
        )
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
        if (e.target.value === "Any" || e.target.value === "Cualquiera") {
            this.setState({ es: true })
            this.setState({ en: true })
        }
        else if (e.target.value === "Español" || e.target.value === "Spanish") {
            this.setState({ es: true })
            this.setState({ en: false })
        }
        else if (e.target.value === "Inglés" || e.target.value === "English") {
            this.setState({ en: true })
            this.setState({ es: false })
        }
        else {
            this.setState({ en: false })
            this.setState({ es: false })
        }
    };

    render() {

        
        const { blogs, en, es, test } = this.state
        const { match } = this.props

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
            <div style={{ backgroundColor: "white" }}>
                <Route exact path="/blogs" render={props => (
                    <Fragment>
                        <h1 className="blog" style={{ color: '#0069D1' }}>Blogs</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            <h2 className="blog" style={{ color: '#0069D1' }}>
                                                <FormattedMessage
                                                    id="Blog.idioma"
                                                    defaultMessage="Idioma:"
                                                />
                                            </h2>
                                        </div>
                                        <div className="col">
                                            <label className="ocult">
                                                .
                                            <select id="idiomas" onChange={this.onChange} value={test} name="test" className="form-control form-control-lg">
                                                    <FormattedMessage id="Blog.cualquiera" defaultMessage="Cualquiera" tagName='option' />
                                                    <FormattedMessage id="Blog.es" defaultMessage="es" tagName='option' />
                                                    <FormattedMessage id="Blog.en" defaultMessage="en" tagName='option' />
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                    <hr />
                                    <hr />
                                    {es && blogs.filter(blog => blog.idioma === "es").map((blog, blogIndex) => (
                                        <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} handleDeleteBlog={() => this.handleDeleteBlog(blog._id, blog.idChat)} />
                                    ))}
                                    {en && blogs.filter(blog => blog.idioma === "en").map((blog, blogIndex) => (
                                        <Blog blog={blog} blogIndex={blogIndex} key={blogIndex} handleDeleteBlog={() => this.handleDeleteBlog(blog._id, blog.idChat)} />
                                    ))}
                                    {localStorage.getItem("login") === "true" && <Link className="btn btn-outline-success btn-lg btn-block" to="/blogs/api/post">

                                        <FormattedMessage
                                            id="Blog.añadir"
                                            defaultMessage="Añadir Nuevo Blog"
                                        />

                                    </Link>
                                    }
                                    {localStorage.getItem("login") === "false" && <button disabled={true} className="btn btn-outline-success btn-lg btn-block" to="/blogs/api/post">

                                        <FormattedMessage
                                            id="Blog.añadir"
                                            defaultMessage="Añadir Nuevo Blog"
                                        />

                                    </button>}

                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
                />

                <Route exact path={`${match.path}/:id`} render={props => (
                    <Fragment>
                        <BlogDetail {...props} />
                    </Fragment>
                )}
                />

                <Route exact path='/blogs/api/post' render={props => (
                    <Fragment>
                        <PostBlog {...props} handlePostBlog={blog => this.handlePostBlog(blog)} />
                    </Fragment>
                )}
                />
                <Route exact path='/blogs/api/put/:id' render={props => (
                    <Fragment>
                        <PutBlog {...props} handlePutBlog={(blog, id) => this.handlePutBlog(blog, id)} />
                    </Fragment>
                )}
                />
            </div>
        )
    }
}
export default Blogs
