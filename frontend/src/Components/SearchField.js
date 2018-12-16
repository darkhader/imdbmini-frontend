import React, { Component } from "react";

class SearchField extends Component {
    _handleTextChange = event =>
        this.props.onSearchChanged &&
        this.props.onSearchChanged(event.target.value);

    render() {
        return (
            <form className="col-3">
                <input
                    style={{ height: "30px", fontSize:"25px"}}
                    onChange={this._handleTextChange}
                    className="form-control"
                    type="text"
                    placeholder="Tìm kiếm"
                />
            </form>
        );
    }
}

export default SearchField;