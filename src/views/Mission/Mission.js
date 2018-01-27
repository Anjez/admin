import React, { Component } from "react";
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
import DepartmentItem from "./../../components/Department/DepartmentItem";
import _ from "lodash";

class Missions extends Component {
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
    this.renderDepartment = this.renderDepartment.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndtDate = this.handleEndtDate.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.dataLogin) {
      getWhere("missions", "==", "userId", user.dataLogin.uid).then(
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
    console.log(this.state.startDate.format("Y-M-D"));
    searchResult = _.filter(this.state.searchItems, user => {
      let byDate = false;
      let byDepartment = false;
      let byEmployee = false;
      if (this.state.startDate) {
        byDate =
          this.state.startDate.format("Y-M-D") ==
          moment(mission.date).format("Y-M-D");
      }
      if (this.state.startDate && this.state.endDate) {
        byDate =
          moment(mission.date).format("Y-M-D") >=
            this.state.startDate.format("Y-M-D") &&
          moment(mission.date).format("Y-M-D") <=
            his.state.endDate.format("Y-M-D");
      }
      if (this.state.department) {
        byDepartment = this.state.department == mission.department;
      }
      if (this.state.employee) {
        byEmployee = this.state.employee == mission.employee;
      }
      return byDate || byDepartment || byEmployee;
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
    this.setState({ startDate: date });
  }
  handleEndtDate(date) {
    this.setState({ endDate: date });
  }

  renderDepartment() {
    let content = null;
    const { start, limit } = this.state;
    const indexOfLastTodo = start * limit;
    const indexOfFirstTodo = indexOfLastTodo - limit;
    if (this.state.searchItems.length > 0) {
      content = [];

      for (let i = indexOfFirstTodo; i < indexOfLastTodo; i++) {
        if (this.state.searchItems[i]) {
          content.push(
            <DepartmentItem
              key={i}
              id={i}
              department={this.state.searchItems[i]}
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
                  <th>إسم الدائرة</th>
                  <th>العنوان</th>
                  <th>المنطقة</th>
                  <th>المحافظة</th>
                  <th>اسم المسؤول</th>
                  <th>الهاتف</th>
                  <th>البريد الالكتروني</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderDepartment()}</tbody>
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
