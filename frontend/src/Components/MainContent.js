import React, { Component } from "react";
import MovieImage from "./MovieImage";

import { Link } from "react-router-dom";

class MainContent extends Component {
    render() {
        const allMovieImages = this.props.movies.map(movie => (
            <div key={movie._id} className="col-3">
                <Link to={`/movies/${movie._id}`}>
                    <MovieImage movie={movie} />
                </Link>
            </div>
        ));

        return (
            <div className="container main_content">
                <div className="row">{allMovieImages}</div>
            </div>
        );
    }
}

export default MainContent;