import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';

import MainContent from "../Components/MainContent";

class HomeScreen extends Component {
    state = {
        movies: [],
        searchString: "",
        addActor:""
    };

    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/movies`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    movies: response.data.movies
                });
            })
            .catch(err => console.error(err));            
    }

    addActor = (actor) => {
        console.log(actor)
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
            </div>
        );
    }
}

export default HomeScreen;