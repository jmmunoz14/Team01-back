import React, { Fragment } from 'react';
import * as d3 from 'd3';
import { FormattedMessage } from "react-intl"
import { textChangeRangeIsUnchanged } from 'typescript';

// hoc that wraps a component inside another component with lifecycle
// events
function Responsive(Component) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = { width: 1880, height: 1100 };
            this.resize = this.resize.bind(this);
        }

        componentDidMount() {
            window.addEventListener('resize', this.resize);
            this.resize();
        }

        resize() {
            const g = this.g;
            const bounds = g.getBoundingClientRect();
            const width = bounds.width;
            const height = bounds.height;
            this.setState({ width, height });
        }

        componentWillMount() {
            window.removeEventListener('resize', this.resize);
        }

        render() {
            const { width, height } = this.state;
            const { props } = this;
            return (
                <div
                    style={{ width: '100%', height: '100%' }}
                    ref={g => this.g = g}
                >
                    {
                        width && <Component
                            width={width}
                            height={height}
                            {...props}
                        />
                    }
                </div>
            );
        }
    }
}

class BarChart extends React.Component {
    constructor() {
        super();
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.draw();
    }

    draw() {
        const {
            width: w,
            height: h,
            partida,
            maxVal,
            usuarios,
            llave
        } = this.props;
        const margin = { top: 0, rigth: 20, bottom: 30, left: 20 }

        const svg = d3.select('#svg0');
        const g = d3.select(this.g).attr('transform', `translate(${margin.left},${margin.top})`);


        const innerW = w - margin.left - margin.rigth;
        const innerH = h - margin.top - margin.bottom;
        var animateDuration = 1700;
        var animateDelay = 15;

        const arreglo = partida.puntajes.map((puntaje, index) => {
            var rObj = {};
            rObj["id"] = usuarios[partida.idUsuarios[index] - 1].username;
            rObj["puntaje"] = puntaje;
            rObj["email"] = usuarios[partida.idUsuarios[index] - 1].email;
            return rObj;
        });
        arreglo.sort((a, b) => b.puntaje - a.puntaje);
        const xscale = d3.scaleBand();
        xscale.domain(arreglo.map(d => d.id));
        xscale.padding(0.2);
        xscale.range([0, innerW]);

        var tooltip = d3.select('body').append('div').style('height', '30px')
            .style('position', 'absolute')
            .style('background', '#f4f4f4')
            .style('padding', '100 10px')
            .style('border', '0px #333 solid')
            .style('border-radius', '10px')
            .style('opacity', '0')
            .style("font-size", "20px")
            .on('mouseover', (d) => {
                tooltip.transition()
                    .style('opacity', 1)



            }
            ).on("mouseout", function (d) {
                tooltip.transition()
                    .style("opacity", 0)
            });

        //console.log(arreglo);

        const yscale = d3.scaleLinear();
        yscale.domain([0, 100]);
        yscale.range([0, innerH]);

        const upd = g.selectAll('rect').data(arreglo);
        const updText = g.selectAll('text').data(arreglo);

        var myColor = d3.scaleLinear().domain([1, 100])
            .range(partida.finalizado ? ["orange", "green"] : ["red", "orange"])
        //console.log(myColor);
        var myChart = upd.enter()
            .append('rect')
            .merge(upd)
            .attr('x', d => xscale(d.id))
            .attr('y', d => h)
            .attr('width', xscale.bandwidth())
            .attr('height', h)
            .attr('fill', function (d) { return myColor(d.puntaje / maxVal) })
            .on('mouseover', (d) => {
                tooltip.transition()
                    .style('opacity', 1)
                tooltip.html("USER: " + d.id + " EMAIL: " + d.email).attr("dy", "0.35em")
                    .style('left', (d3.event.pageX + 12) + 'px')
                    .style('top', (d3.event.pageY + 12) + 'px')


            }
            ).on("mouseout", function (d) {
                tooltip.transition()
                    .style("opacity", 0)
            });

        var myText = updText.enter()
            .append('text')
            .merge(updText)
            .attr('x', (d, i) => (i * ((innerH / arreglo.length) - 16)) + 20)
            .attr('y', 20)
            .text(d => d.puntaje + "")
            .attr('font-size', 18)

        myChart.transition()
            .attr("height", d => yscale(d.puntaje))
            .attr("y", d => h - yscale(d.puntaje / maxVal))
            .duration(animateDuration)
            .delay(function (d, i) {
                return i * animateDelay;
            })
            .ease(d3.easeElastic)

        d3.selectAll('rect').append('text').text('ssss')

        /*g.append('g').call(d3.axisLeft(yscale));
        g.append('g').call(d3.axisBottom(xscale))
            .attr('transform', `translate(0,${400})`);*/

    }

    componentDidUpdate() {
        this.draw();
    }


    render() {
        const { partida, llave } = this.props

        //make svg stretch fully in width and height of parent g
        return (
            <Fragment>
                <h2 className="blog" style={partida.finalizado ? { color: "darkgreen" } : { color: "darkred" }}>
                    <FormattedMessage id="Partida.juego" defaultMessage="Juego #" />
                    {partida.idJuego}
                    {!partida.finalizado ? (
                        <FormattedMessage id="Partida.encurso" defaultMessage=" (En Curso)" />
                    ) : (
                            <FormattedMessage id="Partida.terminada" defaultMessage="Finalizada" />
                        )}
                </h2>
                <h3 className="blog"><FormattedMessage id="Partida.Puntajes" defaultMessage="Puntajes" /></h3>

                <svg
                    className={"svg" + llave}
                    style={{ width: '100%', height: '80%' }}
                    ref={g => {
                        this.g = g;
                    }}
                >
                </svg>
            </Fragment>

        );
    }
}

export default Responsive(BarChart);