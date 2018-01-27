import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import Paginator from "./../../../components/Paginator/Paginator";
import { getWhere } from "./../../../api/firebase";
import UserItem from "./../../../components/Users/UserItem";
import _ from "lodash";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultQury: {},
      items: [],
      searchItems: [],
      searchValue: "",
      start: 1,
      limit: 2
    };
    this.search = this.search.bind(this);
    this.renderEmployees = this.renderEmployees.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.dataLogin) {
      getWhere("employees", "==", "parentId", user.dataLogin.uid).then(
        users => {
          let arrayData = [];
          users.forEach(doc => {
            arrayData.push(doc.data());
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
        return user.name.includes(value) || user.familyName.includes(value);
      });
    }

    this.setState({ searchItems: searchResult });
  }

  renderEmployees() {
    let content = null;
    const { start, limit } = this.state;
    const indexOfLastTodo = start * limit;
    const indexOfFirstTodo = indexOfLastTodo - limit;
    if (this.state.searchItems.length > 0) {
      content = [];
      for (let i = indexOfFirstTodo; i < indexOfLastTodo; i++) {
        content.push(<UserItem key={i} user={this.state.searchItems[i]} />);
      }
      // content = this.state.searchItems.map((user, i) => (
      //   <UserItem key={i} user={user} />
      // ));
    } else {
      content = (
        <tr>
          <td colSpan="5" className="text-center">
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
                <Link to={"/users/add"} className="btn btn-success float-left">
                  إظافة موظف
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
                  <th>الصورة</th>
                  <th>الاسم</th>
                  <th>اللقب</th>
                  <th>الهاتف</th>
                  <th>البريد الالكتروني</th>
                </tr>
              </thead>
              <tbody>{this.renderEmployees()}</tbody>
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

export default connect(mapStateToProps, null)(Users);
// export default Dashboard;
