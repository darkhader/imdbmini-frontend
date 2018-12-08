import React, { Component } from "react";
import config from "../statics";
import { ROOT_API } from '../statics';
import axios from "../axios";
import ActorInMovie from "./ActorInMovie";
class MovieImage extends Component {
    componentDidMount() {

        axios({
            url: `${ROOT_API}/api/movies/${this.props.movieId}`,
            method: "GET",

        }).then(response => {

            console.log(response.data.movie.review)

            const allReview = response.data.movie.review
                ? response.data.movie.review.map(mapreview =>
                    this.setState({
                        name: mapreview.user.name
                    }

                    ))
                : ""
            console.log("name", this.state.name);
            // window.location.href = `http://localhost:3000/citizen/${response.data.citizenFound.id} `
            // toggleLoading(false);
        }).catch(error => {

            console.log(error)


        });

    }
    render() {

        console.log("chym", this.props.movie);

        const reviews = this.props.movie.review
            ? this.props.movie.review.map(review => (
                <p key={review._id}>

                    <span className="font-weight-bold">{
                        review.user ? review.user.name : ""
                    }</span>:{" "}
                    {review.content}
                </p>
            ))
            : "";

        // const actors = this.props.movie.actor
        //     ? this.props.movie.actor.map(actor => (
        //         <p key={actor._id}>

        //             <span className="font-weight-bold">{
        //                 actor.name ? actor.name : ""
        //             }</span>:{" "}
        //             <img src={actor.image}></img>
        //         </p>
        //     ))
        //     : "";

        return (
            <div className="movie_image">
                <img
                    style={{ width: "100%" }}
                    className="img-fluid"
                    src={this.props.movie.image}
                    alt={this.props.movie.title}
                />
                <h5>{this.props.movie.title}</h5>
                <p>{this.props.movie.description}</p>
                <div>Year: {this.props.movie.year}</div>
                <div>Duration: {this.props.movie.duration}</div>
                <ActorInMovie movie={this.props.movie}/>

                {reviews}
            </div>
        );
    }
}

export default MovieImage;