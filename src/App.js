import React, { Component } from 'react';
import './App.css';
import MovieRow from './components/MovieRow';
import axios from 'axios';
import api from "./api.json";
import { Row, Navbar, Nav, Form, ButtonGroup, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: '',
      totalResult: 0,
      value: '',
      num_page: 1,
      movies: [],
      category: 'movie',
      page_num: 1,
      query: null,
    }
    this.performSearch = this.performSearch.bind(this)
    this.HandleCategory = this.HandleCategory.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  performSearch(searchTerm) {
    this.setState({ value: searchTerm })
    var url = `${api.url}/?apikey=${api.apikey}`;
    var query = `&s=${searchTerm}&type=${this.state.category}&page=${this.state.num_page}`;
    axios.get(url + query)
      .then(res => {
        const result = res.data.Search;
        const total = res.data.totalResults
        this.setState({ totalResult: total })
        const movieRows = []
        result.forEach((movie) => {
          const movieRow = <MovieRow key={movie.imdbID} movie={movie} />
          movieRows.push(movieRow)
        })
        this.setState({
          rows: movieRows
        })
      })
  }
  nextPage = () => {
    if (this.state.rows && this.state.num_page < this.state.totalResult) {
      this.setState({
        num_page: this.state.num_page += 1
      }, () => this.performSearch(this.state.value))
    }
  }
  previousPage = () => {
    if (this.state.rows && this.state.num_page !== 1) {
      this.setState({
        num_page: this.state.num_page -= 1
      }, () => this.performSearch(this.state.value))
    }
  }

  HandleCategory(newCategory) {
    this.setState({
      category: newCategory
    }, () => this.performSearch(this.state.value))
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark" className={this.state.value.length > 2 ? "navbarOriginal" : "navbarComplete"}>
          <Navbar.Brand href="#home" className={this.state.value.length > 2 ? "" : "iconCenter"}>
            <img alt="icon" width="50" className={this.state.value.length > 2 ? "iconN" : "iconT"} src="https://cdn4.iconfinder.com/data/icons/roundettes-for-os-x-vol-i-2/505/Movies.png" />
            <h5 className="titleLogo"> M & S</h5>
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline className={this.state.value.length > 2 ? "" : "formSearch"}>
            <div className="container" >
              <div className="container__item">
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form__field"
                  placeholder="Enter search term"
                />
                <button
                  onClick={() => {
                    this.state.value.length >= 3 ?
                      this.performSearch(this.state.value)
                      : alert("Enter more than three characters")
                  }}
                  type="button"
                  className="btn btn--primary btn--inside uppercase">
                  Search !
                  </button>
                <div>
                  <label className="check checkMovie">
                    <input onChange={() => { this.HandleCategory("movie") }} checked="checked" type="radio" name="type" />
                    Movie
                    </label>
                  <label className="check">
                    <input onChange={() => { this.HandleCategory("series") }} type="radio" name="type" />
                    Serie
                    </label>
                </div>
              </div>
            </div>
          </Form>
        </Navbar>
        <h5 className="numberItems">{this.state.totalResult} Results after the search for "{this.state.category}"</h5>
        <Row>
          {this.state.rows}
        </Row>
        <ButtonGroup className={this.state.totalResult === 0 ? "hiddenButton" : "showButton"}>
          <Button onClick={this.previousPage} className="buttonPrevious" variant="secondary">Previous</Button>
          <Button onClick={this.nextPage} className="buttonNext" variant="secondary">Next</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default App;
