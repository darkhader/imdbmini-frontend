import React, { Component } from "react";
import ActorImage from "./ActorImage";

import { Link } from "react-router-dom";

class ActorContent extends Component {
    render() {
        const allActorImages = this.props.actors.map(actor => (
            <div key={actor._id} className="col-3">
                <Link to={`/actors/${actor._id}`}>
                    <ActorImage actor={actor} />
                </Link>
            </div>
        ));

        return (
            <div className="container actor_content">
                <div className="row">{allActorImages}</div>
            </div>
        );
    }
}

export default ActorContent;