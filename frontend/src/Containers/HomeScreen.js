import React, { Component } from "react";

import axios from "../axios";

import NavBar from "../Components/NavBar";
import MainContent from "../Components/MainContent";

class HomeScreen extends Component {
    state = {
        movies: [],
        searchString: ""
    };

    componentDidMount() {
        axios
            .get("/api/movies")
            .then(response => {
                console.log(response.data);
                this.setState({
                    movies: response.data.movies
                });
            })
            .catch(err => console.error(err));
    }

    _onSearchChanged = text => this.setState({ searchString: text });

    render() {
        const displayedMovieImages = this.state.movies.filter(
            movie =>
                movie.title.includes(this.state.searchString) ||
                movie.description.includes(this.state.searchString)
        );

        return (
            <div>
                <NavBar
                    onSearchChanged={this._onSearchChanged}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                /> 
                <MainContent movies={displayedMovieImages} /> 
                {/* <MainContent movies={this.state.movies} /> */}
            </div>
        );
    }
}

export default HomeScreen;