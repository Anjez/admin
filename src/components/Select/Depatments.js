import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "react-select/dist/react-select.css";
import { getWhere } from "./../../api/firebase";
class Dapartments extends PureComponent {
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
      getWhere("departments", "==", "userId", user.dataLogin.uid).then(
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
    this.setState({ selectedOption });
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <Select
        name="form-field-name"
        placeholder="إختيار دائرة"
        value={value}
        onChange={this.handleChange}
        options={this.state.options}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps, null)(Dapartments);
