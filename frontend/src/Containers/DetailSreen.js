import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';

import MovieImage from "../Components/MovieImage";
import TextArea from "../Components/TextArea";

class DetailScreen extends Component {
    state = {
        movieId: this.props.match.params.movieId
    };

    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`)
            .then(response => {
                this.setState({
                    movie: response.data.movie,

                });

            })
            .catch(err => console.error(err));
    }

    _updateReview = (content) => {

        const movie = this.state.movie;
        let reviews = movie.review;
        reviews.push({
            user: { name: this.props.username },
            content: content
        });
        movie.reviews = reviews;
        this.setState({
            review: content
        })
    }

    addActor = (actor) => {
        const { movie } = this.state;
        console.log(actor, movie)
        axios
            .put(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`, {
                actor: actor
            }
            )
            .then(response => {
                // this.setState({
                //     movie: response.data.movie,

                // });
                window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`
                console.log(response);


            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                {/* <NavBar
                    onSearchChanged={this.props.onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this._onCMTSignin}
                    username={this.state.username}
                    onLogin={this.props.onLogin}
                /> */}
                <div className="main_content container">
                    <div className="row">
                        <div className="col-6 mr-auto ml-auto">
                            {this.state.movie ?
                                <MovieImage
                                    addActor={this.addActor}
                                    movieId={this.state.movieId}
                                    movie={this.state.movie}
                                    username={this.props.username}
                                    onLogin={this.props.onLogin}
                                />
                                : ""}
                            <TextArea
                                username={this.props.username}
                                onLogin={this.props.onLogin}
                                movieId={this.state.movieId}
                                review={this.state.review}

                                updateReview={this._updateReview}
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailScreen;