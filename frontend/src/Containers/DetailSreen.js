import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';

import MovieImage from "../Components/MovieImage";
import TextArea from "../Components/TextArea";
import NavBar from "../Components/NavBar";
import { Alert } from 'reactstrap';
class DetailScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false, movieId: this.props.match.params.movieId
        };

        this.onDismiss = this.onDismiss.bind(this);
    }


    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`)
            .then(response => {
                this.setState({
                    movie: response.data.movie,

                });
                axios
                    .put(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`, {
                        luotlike: response.data.movie.like.length
                    }
                    )
                    .then(response => {
                        // this.setState({
                        //     movie: response.data.movie,

                        // });
                        // window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`
                        console.log(response);


                    })
                    .catch(err => console.error(err))
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
                axios
                    .put(`${ROOT_API}/api/actors/${actor}`, {
                        movie: this.props.match.params.movieId
                    }
                    )
                    .then(response => {
                        // this.setState({
                        //     movie: response.data.movie,

                        // });            
                        // window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`



                    })
                    .catch(err => console.error(err));
                // });      

                this.setState({
                    visible: true

                });

                window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`



            })
            .catch(err => console.error(err));
    }
    addLike = (like) => {
        const { movie } = this.state;
        console.log(like, movie)
        axios
            .put(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`, {
                like: like
            }
            )
            .then(response => {

                window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`



            })
            .catch(err => console.error(err));
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render() {
        return (
            <div>
                <NavBar

                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Cap nhat actor thanh cong
      </Alert>
                <div className="main_content container">
                    <div className="row">
                        <div className="col-8 mr-auto ml-auto">
                            {this.state.movie ?
                                <MovieImage
                                    addActor={this.addActor}
                                    addLike={this.addLike}
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