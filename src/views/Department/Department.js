import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import Paginator from "./../../components/Paginator/Paginator";
import { getWhere } from "./../../api/firebase";
import DepartmentItem from "./../../components/Department/DepartmentItem";
import _ from "lodash";

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchItems: [],
      searchValue: "",
      start: 1,
      limit: 2
    };
    this.search = this.search.bind(this);
    this.renderDepartment = this.renderDepartment.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.dataLogin) {
      getWhere("departments", "==", "userId", user.dataLogin.uid).then(
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

  search(value) {
    this.setState({
      searchValue: value
    });
    let searchResult = this.state.items;
    if (value != "") {
      searchResult = _.filter(this.state.searchItems, user => {
        return user.name.includes(value) || user.description.includes(value);
      });
    }

    this.setState({ searchItems: searchResult });
  }

  handleDelete(id) {
    console.log("delete id ====> ", id);
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
          <td colSpan="7" className="text-center">
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
              <Col xs={6}>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-search" />
                  </span>
                  <input
                    name="search"
                    value={this.state.searchValue}
                    className="form-control"
                    placeholder="البحث"
                    type="text"
                    onChange={event => {
                      this.search(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={6}>
                <Link
                  to={"/department/add"}
                  className="btn btn-success float-left"
                >
                  إظافة دائرة
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

export default connect(mapStateToProps, null)(Department);
