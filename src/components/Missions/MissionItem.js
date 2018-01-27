import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { del } from "./../../api/firebase";

class DepartmentItem extends Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this);
  }
  delete(depId, id) {
    if (window.confirm("هل أنت متأكد من فسخ الدائرة")) {
      del("departments", depId).then(() => {
        this.props.handleDelete(id);
      });
    }
  }
  render() {
    const { department, id } = this.props;
    // console.log(department)
    return (
      <tr>
        <td>{department.name}</td>
        <td>{department.address}</td>
        <td>{department.region}</td>
        <td>{department.governorate}</td>
        <td>{department.headmaster}</td>
        <td>{department.phone}</td>
        <td>{department.email}</td>
        <td>
          <Link
            to={`/department/edit/${department.id}`}
            className="btn btn-success btn-sm btn-round"
          >
            <i className="fa fa-pencil" />
          </Link>
          <button
            onClick={() => this.delete(department.id, id)}
            className="btn btn-danger btn-sm btn-round"
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    );
  }
}
DepartmentItem.propTypes = {
  id: PropTypes.number,
  department: PropTypes.object,
  handleDelete: PropTypes.func
};
export default DepartmentItem;
