import React, { Component } from "react";
import config from "../statics";
import { ROOT_API } from '../statics';
import axios from "../axios";
class MovieImage extends Component {
    componentDidMount() {


    }
    render() {



        const actors = this.props.movie.actor
            ? this.props.movie.actor.map(actor => (
                <p key={actor._id}>

                    <span className="font-weight-bold">{
                        actor.name ? actor.name : ""
                    }</span>:{" "}
                    <img src={actor.image}></img>
                </p>
            ))
            : "";

        return (
            <div className="movie_image">
                {actors}

            </div>
        );
    }
}

export default MovieImage;