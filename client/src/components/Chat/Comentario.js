import React, { Component, Fragment } from 'react'

export class Comentario extends Component {
    render() {
        const { comentario } = this.props
        return (
            <Fragment>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="media comment-box ">
                            <div className="media-left">
                                <img alt="user" className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></img>
                            </div>
                            <div className="media-body">
                                <h2 className="media-heading blogDesc">{comentario.idUsuario}</h2>
                                <p className="coment">{comentario.comentario}</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Comentario
