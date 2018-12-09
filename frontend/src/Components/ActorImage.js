import React, { Component } from "react";


class ActorImage extends Component {
    render() {
      

        return (
            <div className="actor_image">
                <img
                    style={{ width: "100%" }}
                    className="img-fluid"
                    src={this.props.actor.image}
                    alt={this.props.actor.name}
                />
                <h5>Name: {this.props.actor.name}</h5>
                <span>Date of birth: {this.props.actor.dob}</span>
                <div>Nationality: {this.props.actor.nationality}</div>
               
            </div>
        );
    }
}

export default ActorImage;