import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  Button
} from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Paginator from "./../../components/Paginator/Paginator";
import { getWhere } from "./../../api/firebase";
import Departments from "./../../components/Select/Departments";
import Employees from "./../../components/Select/Employees";
import MissionItem from "./../../components/Missions/MissionItem";
import _ from "lodash";

class Missions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchItems: [],
      searchValue: "",
      startDate: null,
      endDate: null,
      start: 1,
      limit: 2
    };
    this.search = this.search.bind(this);
    this.renderMission = this.renderMission.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndtDate = this.handleEndtDate.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.dataLogin) {
      getWhere("missions", "==", "parentId", user.dataLogin.uid).then(
        department => {
          let arrayData = [];
          department.forEach(doc => {
            let data = {
              id: doc.id,
              ...doc.data()
            };
            arrayData.push(data);
          });
          this.setState(prevState => ({
            items: arrayData,
            searchItems: arrayData
          }));
        }
      );
    }
  }

  search() {
    let searchResult = [];
    searchResult = _.filter(this.state.searchItems, mission => {
      let search = true;
      if (this.state.startDate) {
        search = search && this.state.startDate.isBefore(mission.date);
      }
      if (this.state.startDate && this.state.endDate) {
        serach =
          search &&
          this.state.startDate.isBefore(mission.date) &&
          this.state.endDate.isAfter(mission.date);
      }
      if (this.state.department) {
        search =search && this.state.department.value == mission.department.value;
      }
      if (this.state.employee) {
        search = search && this.state.employee.value == mission.employee.value;
      }
      return search;
    });

    this.setState({ searchItems: searchResult });
  }

  handleDelete(id) {
    this.setState(prevState => ({
      items: [
        ...prevState.items.slice(0, id),
        ...prevState.items.slice(id + 1)
      ],
      searchItems: [
        ...prevState.items.slice(0, id),
        ...prevState.items.slice(id + 1)
      ]
    }));
  }

  handleStartDate(date) {
    console.log("Start", date);
    this.setState({ startDate: date });
  }
  handleEndtDate(date) {
    console.log("End", date);
    this.setState({ endDate: date });
  }

  renderMission() {
    let content = null;
    const { start, limit } = this.state;
    const indexOfLastTodo = start * limit;
    const indexOfFirstTodo = indexOfLastTodo - limit;
    if (this.state.searchItems.length > 0) {
      content = [];

      for (let i = indexOfFirstTodo; i < indexOfLastTodo; i++) {
        if (this.state.searchItems[i]) {
          content.push(
            <MissionItem
              key={i}
              id={i}
              mission={this.state.searchItems[i]}
              handleDelete={id => this.handleDelete(id)}
            />
          );
        }
      }
    } else {
      content = (
        <tr>
          <td colSpan="8" className="text-center">
            No data
          </td>
        </tr>
      );
    }
    return content;
  }

  page() {}

  render() {
    return (
      <div className="animated fadeIn">
        <Card className="text-right">
          <CardHeader>
            <Row>
              <Col xs={2}>
                <Departments
                  onChange={v => {
                    this.setState({ employee: v });
                  }}
                />
              </Col>
              <Col xs={2}>
                <Employees
                  onChange={v => {
                    this.setState({ employee: v });
                  }}
                />
              </Col>
              <Col xs={2}>
                <DatePicker
                  type="text"
                  placeholderText="تاريخ البداية"
                  className="form-control"
                  isClearable={true}
                  selected={this.state.startDate}
                  onChange={this.handleStartDate}
                />
              </Col>
              <Col xs={2}>
                <DatePicker
                  type="text"
                  placeholderText="تاريخ النهاية"
                  className="form-control"
                  isClearable={true}
                  selected={this.state.endDate}
                  onChange={this.handleEndtDate}
                />
              </Col>
              <Col xs={1}>
                <Button
                  className="btn btn-sm btn-success"
                  onClick={this.search}
                >
                  <i className="icon-magnifier" />
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  className="btn btn-sm btn-warning"
                  onClick={() =>
                    this.setState(prevState => ({
                      searchItems: prevState.items
                    }))
                  }
                >
                  <i className="fa fa-close" />
                </Button>
              </Col>
              <Col xs={2}>
                <Link
                  to={"/mission/add"}
                  className="btn btn-success float-left"
                >
                  إظافة مهمة
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              hover
              responsive
              className="table-outline mb-0 d-none d-sm-table"
            >
              <thead className="thead-light">
                <tr>
                  <th>عنوانالمهمة</th>
                  <th>التفاصيل</th>
                  <th>الدائرة</th>
                  <th>الموظف</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderMission()}</tbody>
            </Table>
            <Paginator
              count={this.state.items.length}
              limit={2}
              paginate={page =>
                this.setState({
                  start: page
                })
              }
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(Missions);
