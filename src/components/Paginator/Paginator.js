import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import _ from "lodash";
import { getAll } from "./../../api/firebase";

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
    this.renderItem = this.renderItem.bind(this);
    this.handlePginator = this.handlePginator.bind(this);
  }

  handlePginator(i) {}

  renderItem() {
    const { count, limit, paginate } = this.props;
    let tabArrayItems = [];
    const numberPage = Math.ceil(count / limit);
    for (let i = 1; i <= numberPage; i++) {
      tabArrayItems.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => paginate(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return tabArrayItems;
  }
  render() {
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {this.renderItem()}
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    );
  }
}

Paginator.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  paginate: PropTypes.func
};
