import React, { Component } from 'react';
import axios from '../axios';

class TextArea extends Component {
    _onSubmitComment = (event) => {
        event.preventDefault();
        const { review } = this.props;
        axios
            .post(`/api/reviews/`,{
                content: review
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <form onSubmit={this._onSubmitComment}>
                <div className="form-group">
                    <label>Add review: </label>
                    <textarea
                        className="form-control"
                        rows="2"
                        onChange={(event) => {
                            this.props.updateComment(event.target.value);
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