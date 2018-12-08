import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import ActorContent from "../Components/ActorContent";

class ActorScreen extends Component {
    state = {
        actors: [],
        searchString: ""
    };

    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/actors`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    actors: response.data.actors
                    
                });
            })
            .catch(err => console.error(err));
    }

    _onSearchChanged = text => this.setState({ searchString: text });

    render() {
        const displayedActorImages = this.state.actors.filter(
            actor =>
                actor.name.includes(this.state.searchString) ||
                actor.nationality.includes(this.state.searchString)
        );

        return (
            <div>
                {/* <NavBar
                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                  
                />  */}
                <ActorContent actors={displayedActorImages} /> 
                {/* <ActorContent actors={this.state.actors} /> */}
            </div>
        );
    }
}

export default ActorScreen;