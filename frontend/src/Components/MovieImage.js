import React, { Component } from "react";
import config from "../statics";
import { ROOT_API } from '../statics';
import axios from "../axios";
import ActorInMovie from "./ActorInMovie";
import LikeDisLike from "./LikeDisLike";
import Trailer from "./Trailer";
class MovieImage extends Component {
    componentDidMount() {

        axios({
            url: `${ROOT_API}/api/movies/${this.props.movieId}`,
            method: "GET",

        }).then(response => {
        }).catch(error => {
            console.log(error)
        });

    }
    render() {


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


        return (
            <div className="movie_image">
                <img
                    style={{ width: "100%", height: "100%" }}
                    className="img-fluid text-center"
                    src={this.props.movie.image}
                    alt={this.props.movie.title}
                />
                <LikeDisLike
                    hiddenReview={this.props.hiddenReview}
                    movie={this.props.movie}
                    addLike={this.props.addLike} />
                <h5>{this.props.movie.title}</h5>
                <p>Thể loại:  {this.props.movie.description}</p>
                
                <Trailer
                hiddenReview={this.props.hiddenReview}
                 title={this.props.movie.title}/>


                <div>Year: {this.props.movie.year}</div>
                <div>Duration: {this.props.movie.duration}</div>
                <ActorInMovie
                    hiddenReview={this.props.hiddenReview}
                    movie={this.props.movie}
                    addActor={this.props.addActor} />

                {this.props.hiddenReview ? "" : reviews}

            </div>
        );
    }
}

export default MovieImage;