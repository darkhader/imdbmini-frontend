import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';

import MainContent from "../Components/MainContent";
import Page from "../Components/Page";

class HomeScreen extends Component {
    state = {
        movies: [],
        searchString: "",
        addActor:"",
        pageNumber:1,
        total:0
    };

    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/movies?page=${this.state.pageNumber}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    movies: response.data.movies,
                    total: response.data.total
                });
            })
            .catch(err => console.error(err));            
    }

    addActor = (actor) => {
        console.log(actor)
    }

    _onSearchChanged = text => this.setState({ searchString: text });

    changePage = (pageNumber) => {
        axios
            .get(`${ROOT_API}/api/movies?page=${pageNumber}`)
            .then(response => {
                this.setState({
                    movies: response.data.movies,
                    pageNumber
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        const displayedMovieImages = this.state.movies.filter(
            movie =>
                movie.title.includes(this.state.searchString) ||
                movie.description.includes(this.state.searchString)
        );

        return (
            <div>
                {/* <NavBar
                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                /> */}
                <MainContent
                    addActor={this.addActor}
                    movies={displayedMovieImages} />
                {/* <MainContent movies={this.state.movies} /> */}
                <Page total={this.state.total} currentPage={this.state.pageNumber} changePage={this.changePage}/>
            </div>
        );
    }
}

export default HomeScreen;