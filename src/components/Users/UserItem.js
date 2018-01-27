import React, { Component } from "react";
import { Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";

class UserItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td className="text-center">
          <div className="avatar">
            <img src={user.image} className="img-avatar" />
            <span className="avatar-status badge-success" />
          </div>
        </td>
        <td>{user.name}</td>
        <td>{user.familyName}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
      </tr>
    );
  }
}

export default UserItem;
