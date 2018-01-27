import React, { Component, createFactory } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, ToastMessage } from "react-toastr";
import { fetchUser } from "./../../actions/userActions";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";
import Dashboard from "../../views/Dashboard/";

//User
import Users from "../../views/Users/List/";
import AddUser from "../../views/Users/Add/";
import EditUser from "../../views/Users/Edit";
//Department
import Department from "../../views/Department/Department";
import AddDepartment from "../../views/Department/Add";
import EditDepartment from "../../views/Department/Edit";
//Mission
import Mission from "../../views/Mission/Mission";
import AddMission from "../../views/Mission/Add";
const ToastMessageFactory = createFactory(ToastMessage.animation);

class Full extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.dataLogin == null) {
      console.log("Receive props user Full ====> ", nextProps.user)
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    if (this.props.user.dataLogin == null) {
      this.props.history.push("/login");
    }
  }

  render() {
    console.log("")
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <ToastContainer
                ref="container"
                toastMessageFactory={ToastMessageFactory}
                className="toast-top-right"
              />
              <Switch>
                <Route
                  path="/dashboard"
                  name="Dashboard"
                  component={Dashboard}
                />
                <Route exact path="/users" name="Users" component={Users} />
                <Route exact path="/users/add" name="Add" component={AddUser} />
                <Route
                  exact
                  path="/users/edit/:userId"
                  name="Edit"
                  component={EditUser}
                />
                <Route
                  exact
                  path="/department"
                  name="Department"
                  component={Department}
                />
                <Route
                  exact
                  path="/department/add"
                  name="Add"
                  component={AddDepartment}
                />
                <Route
                  exact
                  path="/department/edit/:departmentId"
                  name="Edit"
                  component={EditDepartment}
                />
                <Route
                  exact
                  path="/mission"
                  name="Mission"
                  component={Mission}
                />
                <Route
                  exact
                  path="/mission/add"
                  name="Add"
                  component={AddMission}
                />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser())
  };
}
const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(Full);
