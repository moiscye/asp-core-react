import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";

const style = {
  position: "absolute",
  right: 10 + "%"
};

export default class PaginationExampleCustomization extends Component {
  render() {
    return (
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
        onPageChange={this.props.handlePaginationChange}
        style={style}
      />
    );
  }
}
