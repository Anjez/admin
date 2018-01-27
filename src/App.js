import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {fetchUser} from "./actions/userActions"
// Styles
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";

// Containers
import Full from "./containers/Full/";
import Login from "./views/Login"
import Register from "./views/Register"
class App extends Component {
  
  constructor(props) {
    super(props);
    this.props.fetchUser()
  }
  
  async componentWillMount() {
    await this.props.fetchUser()
  }
  

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" name="Login" component={Login} />
          <Route path="/register" name="Register" component={Register} />
          <Route path="/" name="Home" component={Full} />
        </Switch>
      </HashRouter>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}
const mapStateToProps = (state) => {
  return ({ user: state.user })
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
