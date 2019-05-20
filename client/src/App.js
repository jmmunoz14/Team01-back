import React, { Component, Fragment } from 'react'
import Toolbar from './components/Toolbar/Toolbar'
import Blogs from './components/Blog/Blogs'
import Partidas from './components/Partida/Partidas'
import Pregunta from './pages/Pregunta'
import Habilidades from './components/Habilidades/Habilidades'
import {FormattedMessage} from 'react-intl';


import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import Materias from './components/Materia/Materias';


class App extends Component {

  constructor() {
    super();
    this.state = {
      
    };
  }
  render() {

    
    
    return (
      <Router>

        <div className='App'>
          <div className='Toolbar'>
            <Toolbar />
          </div>
          

          <Route exactm path='/home' render={props => (
            <Fragment>
              <h1>HOME</h1>
            </Fragment>
          )}
          />



          <Route path='/blogs' render={props => (
            <Fragment>
              <Blogs {...props} />
            </Fragment>
          )}
          />

          <Route path='/partidas' render={props => (
            <Fragment>
              <Partidas {...props} />
            </Fragment>
          )}
          />
          <Route exact path='/materias' render={props => (
            <Fragment>
              <Materias {...props} />
            </Fragment>
          )}
          />
          <Route exact path='/habilidades' render={props => (
            <Fragment>
              <Habilidades {...props} />
            </Fragment>
          )}
          />

          <Route exact path='/' render={props => (
            <Fragment>
              
              <img src={require("./images/mathicon.png")} className="mainImage" alt="Icono" ></img>
              <h1 className='welcome'> <FormattedMessage id="Bienvenido a"/> </h1>
              <h1 className='welcome2'>The Math Games</h1>
              <h2 className='tagline'> <FormattedMessage id="tagline"/></h2>

            </Fragment>
          )}
          />

          <Route path='/quiz' render={props => (
            <Fragment>
              <Pregunta />
            </Fragment>
          )}
          />
        </div>
      </Router>


    )
  }
}

export default App
