import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Row, Col, Table, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { del } from "./../../api/firebase";

class MissionItem extends PureComponent {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.status = this.status.bind(this)
  }
  delete(depId, id) {
    if (window.confirm("هل أنت متأكد من فسخ الدائرة")) {
      del("missions", depId).then(() => {
        this.props.handleDelete(id);
      });
    }
  }

  status() {
    const { mission } = this.props;
    let color = "";
    let text = ""
    switch (mission.status) {
      case 'C':
        color = "info";
        text = "Created"
        break;
      case 'P':
        color = "success";
        text = "Progress"
        break;
      case 'T':
        color = "secondary";
        text = "Cancel"
        break;
    }
    return <Badge color={color} pill>{text}</Badge>
  }
  render() {
    const { mission, id } = this.props;
    console.log(mission)
    return (
      <tr>
        <td>{mission.title}</td>
        <td>{mission.description}</td>
        <td>{mission.department.label}</td>
        <td>{mission.employee.label}</td>
        <td>{moment(mission.date).format("YYYY/MM/DD")}</td>
        <td>{this.status()}</td>
        <td>
          {/* <Link
            to={`/mission/edit/${mission.id}`}
            className="btn btn-success btn-sm btn-round"
          >
            <i className="fa fa-pencil" />
          </Link>
          <button
            onClick={() => this.delete(mission.id, id)}
            className="btn btn-danger btn-sm btn-round"
          >
            <i className="fa fa-trash" />
          </button> */}
        </td>
      </tr>
    );
  }
}
MissionItem.propTypes = {
  id: PropTypes.number,
  mission: PropTypes.object,
  handleDelete: PropTypes.func
};
export default MissionItem;
