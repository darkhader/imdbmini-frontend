import React, { Component } from 'react';
import axios from '../axios';
import { ROOT_API } from '../statics';
class TextArea extends Component {
    _onSubmitReview = (event) => {
        event.preventDefault();
        const { review, movieId, userId } = this.props;
        console.log("review", review);
        axios
        .get(`${ROOT_API}/api/auth/`)
        .then(response => {
            console.log("res",response.data.userFound.name)
            // this.setState
            axios
            .post(`${ROOT_API}/api/reviews/`,{
                content: review,
                movie: movieId,
                user: response.data.userFound.id
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            });
        })
        .catch(err => {
            console.log(err)
        });

       
    }

    render() {
        return (
            <form onSubmit={this._onSubmitReview}>
                <div className="form-group">
                    <label>Add review: </label>
                    <textarea
                        className="form-control"
                        rows="2"
                        onChange={(event) => {
                            this.props.updateReview(event.target.value);
                        }}
                    >
                    </textarea>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary"
                    >Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default TextArea;