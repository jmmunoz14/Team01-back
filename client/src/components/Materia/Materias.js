import React, { Component } from 'react';
import Materia from "./Materia";
import MateriaPage from "./MateriaPage";
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';

class Table extends Component{
    constructor(props){
        super(props);
        this.handleSelected = this.handleSelected.bind(this);
    }

    handleSelected(e){
        this.props.onSelection(e);
    }


    noEncuentra(es,en, filterText){
        var esLo = String(es).toLowerCase();
        var enLo = String(en).toLowerCase();
        var text = String(filterText).toLowerCase()
        var esp = Boolean(esLo.indexOf(text) === -1);
        var eng = Boolean(enLo.indexOf(text) === -1);
        return Boolean(esp&&eng);
        
    }

    render(){
        const rows = [];
        const products = this.props.products;
        const filterText = this.props.filterText;

        products.forEach((mat) => {
            if (this.noEncuentra(mat.nameEs,mat.nameEn,filterText)) {
                return;
            }
            rows.push(
                <Materia 
                    key={mat._id.toString()} 
                    materia={mat}
                    onSeleccion={this.handleSelected}/>
                );
        });
        return (
            <div className="row no-gutters mx-auto">
            {rows}
            </div>   
          
        );
    }
}





export class Materias extends Component {
    constructor(props) {
        super(props)
        this.state = {
            materias: [],
            materiaSeleccionada:null,
            searchText: "",
            backCargado: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    componentDidMount() {
        fetch('https://team01back.herokuapp.com/materias/')
            .then(results => {
                return results.json();

            }).then(data => {
                this.setState({ backCargado:true, materias: data });
            })

    }

    handleSearch(event) {
        this.setState({ searchText: event.target.value });
    }

    handleSelection(materia){
        this.setState({materiaSeleccionada : materia});
        document.getElementById("search-subject").scrollIntoView();
    }

    render() {

        if(!this.state.backCargado){
            return(
                <div className="m-auto">
                    <img  src= "images/loader.gif"
                        alt={
                                navigator.language.includes("en")
                                ? "Loading data"
                                : "Cargando la información" 
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

            <div className="container">

                <h1>
                    <FormattedMessage 
                        id="Materia.titulo"
                        defaultMessage= "Encuentra tus juegos por materia!"
                    />
                </h1>
                <TextField
                    fullWidth
                    placeholder={
                        navigator.language.includes("en") 
                        ? "Search for your subject"
                        : "Busca tu materia" }
                    onChange={this.handleSearch}
                    label= {
                        navigator.language.includes("en")
                        ? "Search for your subject:"
                        : "Busca tu materia:" 
                    }
                    id="search-subject"
                    />
                <MateriaPage 
                    materia={this.state.materiaSeleccionada}
                    onClose={this.handleSelection}
                    />                        
                <Table 
                    products = {this.state.materias} 
                    filterText={this.state.searchText}
                    onSelection={this.handleSelection}
                    />
                
                 
            </div>
        );
    }
}

export default Materias