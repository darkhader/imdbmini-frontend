import React, { Component } from "react";
import config from "../config";

class MovieImage extends Component {
    render() {
        console.log(this.props.movie);
        
        const reviews = this.props.movie.review
            ? this.props.movie.review.map(review => (
                <p key={review._id}>
                    {/* <span className="font-weight-bold">{comment.createdBy.username}</span>:{" "} */}
                    {review.content}
                </p>
            ))
            : "";

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
                
                {reviews}
            </div>
        );
    }
}

export default MovieImage;