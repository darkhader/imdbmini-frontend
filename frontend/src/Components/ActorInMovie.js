import React, { Component } from "react";
import config from "../statics";
import { ROOT_API } from '../statics';
import axios from "../axios";
import '../App.css';
import Autocomplete from "react-autocomplete"
class ActorInMovie extends Component {
    state = {
        actor: "",
        actors: []
    }
    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/actors/`)
            .then(data => {
                this.setState({
                    actors: data.data.actors
                });


            })
            .catch(err => console.error(err));



        // axios
        // .get(`${ROOT_API}/api/actors/`)
        // .then(data => {
        //   this.setState({
        //     actors: data.data.actors
        //   });


        // })
        // .catch(err => console.error(err));
    }
    render() {
        const { addActor } = this.props;








        const actors = this.props.movie.actor
            ? this.props.movie.actor.map(actor => (

                this.props.hiddenReview ? "" :
                    <div className="col-3" key={actor._id}>
                        <span className="font-weight-bold">{


                            actor.name ? actor.name : ""
                        }</span>:{" "}
                        <img src={actor.image}
                            style={{ width: "100%", height: "100%" }}
                            className="img-fluid"
                        ></img>
                    </div>
            ))
            : "";




        // this.props.addActor( this.state.actor);

        return (
            this.props.hiddenReview ? "" :
                <div className="container">
                    <div className="movie_image ">
                        {actors}
                    </div>
                    <Autocomplete
                        getItemValue={(item) => item._id}
                        items={this.state.actors}
                        renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.name}
                                <img src={item.image} style={{ marginLeft: "50%   ", width: "120px", height: "150px" }}
                                    className="img-fluid"></img>
                            </div>
                        }
                        value={this.state.actor}
                        onChange={(e) => {
                            // value = e.target.value;
                            console.log(e.target.value);
                            this.setState({ actor: e.target.value });
                        }}
                        onSelect={(value) => {
                            this.setState({ actor: value });
                            console.log(value)

                            addActor(value);

                        }}
                        menuStyle={{
                            borderRadius: '3px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            padding: '2px 0',
                            fontSize: '90%',
                            position: 'fixed',

                            // left: "auto",
                            // top: "auto",
                            overflowY: 'scroll',
                            maxHeight: '200px', // TODO: don't cheat, let it flow to the bottom
                        }}
                    />
                </div>


        );
    }
}

export default ActorInMovie;