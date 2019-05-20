import React, { Component } from "react";
import { Link } from "react-router-dom"
import { FormattedMessage } from 'react-intl';
class Blog extends Component {

  componentDidMount = () => {


  }
  reload = () => {
    window.location.reload()
  }

  render() {
    const { blog, handleDeleteBlog } = this.props;
    var fecha = new Date();
    fecha.setUTCMilliseconds(parseInt(blog.date) - fecha.getTime())
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-9">
            <Link className="blog" to={"/blogs/" + blog._id} >
              <h2 className="blog">
                {blog.titulo}
              </h2>
            </Link>
            <p className="blog">
              <FormattedMessage
                id="Blog.publicadopor"
                defaultMessage="Publicado Por"
              />
              <span style={{ color: "#0069D1", fontWeight: "bolder" }}>{" " + blog.idUsuario}</span>{" " + fecha.toString()}</p>
          </div>
          <div className="col-lg-3">
            <React.Fragment>
              <button disabled={!((localStorage.getItem("username") === blog.idUsuario) && (localStorage.getItem("login") === "true"))} className="btn btn-outline-danger btn-lg btn-block btn-outline" onClick={handleDeleteBlog}>
                <FormattedMessage
                  id="Blog.borrar"
                  defaultMessage="Borrar"
                /></button>
              {((localStorage.getItem("username") === blog.idUsuario) && (localStorage.getItem("login") === "true")) && <Link className="btn btn-outline-info btn-lg btn-block" to={"/blogs/api/put/" + blog._id}>
                <FormattedMessage
                  id="Blog.actualizar"
                  defaultMessage="Actualizar"
                />
              </Link>}
              {!((localStorage.getItem("username") === blog.idUsuario) && (localStorage.getItem("login") === "true")) && <button className="btn btn-outline-info btn-lg btn-block" disabled={true}>
                <FormattedMessage
                  id="Blog.actualizar"
                  defaultMessage="Actualizar"
                />
              </button>}
            </React.Fragment>
          </div>
        </div>
        <hr>
        </hr>
      </React.Fragment>
    );
  }
}
export default Blog