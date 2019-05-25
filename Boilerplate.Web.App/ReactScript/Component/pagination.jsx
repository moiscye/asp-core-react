import React, { Component } from "react";
import { Pagination, Container } from "semantic-ui-react";

export default class PaginationExampleCustomization extends Component {
  render() {
    return (
      <div className="ui clearing segment">
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={10}
          onPageChange={this.props.handlePaginationChange}
        />
      </div>
    );
  }
}
