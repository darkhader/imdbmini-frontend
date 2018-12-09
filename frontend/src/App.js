import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "./axios";

import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailSreen";
import ActorScreen from "./Containers/ActorScreen";
import { ROOT_API } from './statics';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import AddMovie from "./Components/AddMovie";
import AddActor from "./Components/AddActor";
class App extends Component {
    state = {};

    _onLogin = () => {
        axios({
            url: `${ROOT_API}/api/auth/login`,
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(response => {
            if (response.data.success) {
                this.setState({
                    username: response.data.userFound.name,

                })
                // window.location.href = `http://localhost:3000/ `

            }
            // toggleLoading(false);
        }).catch(error => {

            console.log(error)


        });
    };
    _onNameSignin = text => this.setState({ email: text });
    _onCMTSignin = text => this.setState({ password: text });
    componentDidMount() {

        axios({
            url: `${ROOT_API}/api/auth`,
            method: "GET",

        }).then(response => {
            this.setState({
                username: response.data.userFound.name,

            })


            // window.location.href = `http://localhost:3000/citizen/${response.data.citizenFound.id} `
            // toggleLoading(false);
        }).catch(error => {

            console.log(error)


        });

    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar


                        onNameSignin={this._onNameSignin}
                        onCMTSignin={this._onCMTSignin}
                        username={this.state.username}
                        onLogin={this._onLogin}
                    />
                    <Route
                        exact
                        path="/"
                        render={props => {

                            return (<h5> Home Screen</h5> 
                             );

                        }}
                    />
                    <Route
                        path="/movie"
                        render={props => {
                            return <HomeScreen
                                {...props}
                                onNameSignin={this._onNameSignin}
                                onCMTSignin={this._onCMTSignin}
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
                                onNameSignin={this._onNameSignin}
                                onCMTSignin={this._onCMTSignin}
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
                                onNameSignin={this._onNameSignin}
                                onCMTSignin={this._onCMTSignin}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />
                      <Route
                        path="/createNew"
                        render={props => {
                            return <AddMovie {...props}
                            username={this.state.username}
                            onLogin={this._onLogin}
                           
                             />
                        }}
                    />
                     <Route
                        path="/addNew"
                        render={props => {
                            return <AddActor {...props}
                            username={this.state.username}
                            onLogin={this._onLogin}
                           
                             />
                        }}
                    />
                    <Route
                        path="/SignUp"
                        render={props => {
                            return <SignUp {...props}
                            username={this.state.username}
                            onLogin={this._onLogin}
                           
                             />
                        }}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;