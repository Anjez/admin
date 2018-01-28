import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import "react-select/dist/react-select.css";
import { getWhere } from "./../../api/firebase";
class Employees extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      options: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    if (user.dataLogin) {
      getWhere("employees", "==", "parentId", user.dataLogin.uid).then(
        department => {
          let arrayData = [];
          department.forEach(doc => {
            arrayData.push({
              value: doc.id,
              label: doc.data().name
            });
          });
          this.setState({
            options: arrayData
          });
        }
      );
    }
  }

  handleChange(selectedOption) {
    console.log("selected value employee ", selectedOption)
    this.setState({ selectedOption });
    this.props.onChange(selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <Select
        placeholder="إختيار موظف"
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={this.state.options}
      />
    );
  }
}

Employees.propTypes = {
  onChange: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps, null)(Employees);
