//Dependencies
import React, { Component } from 'react';
import './MovieRow.css';
import api from "../api.json";
import axios from 'axios';
import { Col, Modal } from 'react-bootstrap';

export default class MovieRow extends Component {
    constructor() {
        super()
        this.state = {
            modalOpen: false,
            movie: [],
            movieView: [],
            isOpen: false
        }
        this.SearchById = this.SearchById.bind(this)
    }
    SearchById(id) {
        var url = `${api.url}/?apikey=${api.apikey}`;
        var query = `&i=${id}`;
        axios.get(url + query)
            .then(res => {
                this.setState({
                    movie: res.data,
                    movieView: res.data
                })
            })
    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Col sm={3} md={2} xs={12}>
                <div className="principalContainer">
                    <div className="cellphone-container">
                        <div className="movieView">
                            <div className="menu"><i className="material-icons"></i></div>
                            <img alt="poster img" className="movie-img" src={this.props.movie.Poster}></img>
                            <div className="text-movie-cont">
                                <div className="mr-grid">
                                    <div className="col1">
                                        <h1>{this.props.movie.Title}</h1>
                                        <ul className="movie-gen">
                                            <li>Year: {this.props.movie.Year}</li>
                                            <li>2h 49min  /</li>
                                            <li>Adventure, Drama, Sci-Fi,</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mr-grid summary-row">
                                    <div className="col2">
                                        <ul className="movie-likes">
                                            <li><i className="material-icons">&#xE813;</i>124</li>
                                            <li><i className="material-icons">&#xE813;</i>3</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mr-grid action-row">
                                    <div className="watch-btn" onClick={() => { this.toggleModal(this.SearchById(this.props.movie.imdbID)) }}>
                                        <h3><i className="material-icons">&#xE037;</i>DESCRIPTION</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.isOpen}
                    onClose={this.toggleModal}>
                    <div className="principalContainerModal">
                        <div className="cellphone-containerModal">
                            <div className="movie movieModal">
                                <div className="menu"><i className="material-icons"></i></div>
                                <img alt="poster img" className="movie-imgModal" src={this.props.movie.Poster}></img>
                                <div className="text-movie-cont">
                                    <div className="mr-grid">
                                        <div className="col1">
                                            <h1>{this.props.movie.Title}</h1>
                                            <ul className="movie-gen">
                                                <li>Year: {this.state.movieView.Year}</li>
                                                <li>Director: {this.state.movieView.Director}</li>
                                                <li>2h 49min  /</li>
                                                <li>Adventure, Drama, Sci-Fi,</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mr-grid summary-row">
                                        <div className="col-12">
                                            <h5>SUMMARY</h5>
                                            <p className="Plot">{this.state.movieView.Plot}</p>
                                        </div>
                                        <div className="col2">
                                            <ul className="movie-likes">
                                                <li><i className="material-icons">&#xE813;</i>124</li>
                                                <li><i className="material-icons">&#xE813;</i>3</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mr-grid action-row">
                                        <div className="watch-btn" onClick={() => { this.toggleModal() }}>
                                            <h3>CLOSE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Col>
        );
    }
}
