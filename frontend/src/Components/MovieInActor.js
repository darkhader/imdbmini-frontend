import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";
import '../App.css';

class MovieInActor extends Component {
    state = {
        movie:"",
        movies:[]
    }
    componentDidMount() {
        axios
        .get(`${ROOT_API}/api/movies/`)
        .then(data => {
          this.setState({
            movies: data.data.movies
          });
         
          
        })
        .catch(err => console.error(err));


        
    }
    render() {
       
      
            

            
       



        const movies = this.props.actor.movie
            ? this.props.actor.movie.map(movie => (

                this.props.hiddenReview ? "" :
                <div className="col-3" key={movie._id}>
                    <span className="font-weight-bold">{ 
                        
                       
                        movie.title ? movie.title : "" 
                    }</span>:{" "}
                    <img src={movie.image}
                        style={{ width: "100%" }}
                        className="img-fluid"
                    ></img>
                </div>
            ))
            : "";
           
            
         
            
            // this.props.addActor( this.state.actor);

        return (
            this.props.hiddenReview ? "" :
            <div className="container">
                <div className="movie_image row">
                    {movies}</div>
             
                    
            </div>


        );
    }
}

export default MovieInActor;