import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "./axios";

import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailSreen";
import ActorScreen from "./Containers/ActorScreen";

import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";

class App extends Component {
    state = {};

    _onLogin = () => {
        axios
            .post("/api/auth", {
                username: "admin",
                password: "123456"
            })
            .then(response => {
                console.log(response)
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                })
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    
                    <Route
                        exact
                        path="/"
                        render={props => {
                            
                            return (<h5> Home Screen</h5>,
                                <NavBar />);

                        }}
                    />
                    <Route
                        path="/movie"
                        render={props => {
                            return <HomeScreen
                                {...props}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />

                    <Route
                        path="/movies/:movieId"
                        render={props => {
                            return <DetailScreen
                                {...props}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />
                     <Route
                        path="/actor"
                        render={props => {
                            return <ActorScreen
                                {...props}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;