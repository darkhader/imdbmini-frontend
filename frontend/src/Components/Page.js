import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
 
class Page extends Component {
  // constructor(props) {
  //   super(props);
  // }
 
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.props.changePage(pageNumber);
  }
 
  render() {
    return (
      <div>
        <Pagination
          activePage={this.props.currentPage}
          itemsCountPerPage={5}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default Page;
 