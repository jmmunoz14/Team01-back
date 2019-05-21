import React, { Component } from 'react';
import Habilidad from "./Habilidad";
import HabilidadPage from "./HabilidadPage";
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';


class Table extends Component {
    constructor(props) {
        super(props);
        this.handleSelected = this.handleSelected.bind(this);
    }

    handleSelected(e) {
        this.props.onSelection(e);
    }


    noEncuentra(es, en, filterText) {
        var esLo = String(es).toLowerCase();
        var enLo = String(en).toLowerCase();
        var text = String(filterText).toLowerCase()
        var esp = Boolean(esLo.indexOf(text) === -1);
        var eng = Boolean(enLo.indexOf(text) === -1);
        return Boolean(esp && eng);

    }

    render() {
        const rows = [];
        const products = this.props.products;
        const filterText = this.props.filterText;


        products.forEach((hab) => {

            if (this.noEncuentra(hab.nameEs, hab.nameEn, filterText)) {
                return;
            }


            rows.push(
                <Habilidad
                    key={hab._id.toString()}
                    habilidad={hab}
                    onSeleccion={this.handleSelected} />
            );
        });
        return (
            <div className="row no-gutters mx-auto">
                {rows}
            </div>
        );
    }
}




export class Habilidades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habilidades: [],
            habilidadSeleccionada: null,
            searchText: "",
            backCargado: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    componentDidMount() {
        fetch('https://team01back.herokuapp.com/habilidades/')
            .then(results => {
                return results.json();

            }).then(data => {
                this.setState({backCargado:true, habilidades: data });
            })

    }

    handleSearch(event) {
        this.setState({ searchText: event.target.value });
    }

    handleSelection(habilidad) {
        this.setState({ habilidadSeleccionada: habilidad });
        document.getElementById("search-skill").scrollIntoView();

    }

    render() {
        if(!this.state.backCargado){
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


            <div className="container">

                <h1>
                    <FormattedMessage
                        id="Habilidad.titulo"
                        defaultMessage="Encuentra tus juegos por habilidad!"
                    />
                </h1>
                <TextField
                    fullWidth
                    placeholder={
                        navigator.language.includes("en")
                            ? "Search for your skill"
                            : "Busca tu habilidad"}
                    onChange={this.handleSearch}
                    label={
                        navigator.language.includes("en")
                            ? "Search for your skill:"
                            : "Busca tu habilidad:"
                    }
                    id="search-skill"
                />
                <HabilidadPage
                    habilidad={this.state.habilidadSeleccionada}
                    onClose={this.handleSelection}
                />
                <Table
                    products={this.state.habilidades}
                    filterText={this.state.searchText}
                    onSelection={this.handleSelection}
                />

            </div>
        );
    }
}

export default Habilidades