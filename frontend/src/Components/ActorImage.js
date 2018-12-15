import React, { Component } from "react";
import LikeActor from "./LikeActor";
import { ROOT_API } from '../statics';
import axios from "../axios";
import MovieInActor from "./MovieInActor";
class ActorImage extends Component {
    componentDidMount() {

        axios({
            url: `${ROOT_API}/api/actors/${this.props.actorId}`,
            method: "GET",

        }).then(response => {       
        }).catch(error => {
           console.log(error)
        });

    }
    render() {
        const reviews = this.props.actor.review
        ? this.props.actor.review.map(review => (
            <p key={review._id}>

                <span className="font-weight-bold">{
                    review.user ? review.user.name : ""
                }</span>:{" "}
                {review.content}
            </p>
        ))
        : "";

        return (
            <div className="actor_image">
                <img
                 
                    className="img-fluid"
                    src={this.props.actor.image}
                    alt={this.props.actor.name}
                />
                <LikeActor  hiddenReview={this.props.hiddenReview}
                 actor={this.props.actor}
                 addLike={this.props.addLike}/>
                <h5>Name: {this.props.actor.name}</h5>
                <span>Date of birth: {this.props.actor.dob}</span>
                <div>Nationality: {this.props.actor.nationality}</div>
                <MovieInActor
                hiddenReview={this.props.hiddenReview}
                actor={this.props.actor} 
               />
               <p>Review:</p>
                {this.props.hiddenReview ? "" : reviews}
            </div>
        );
    }
}

export default ActorImage;