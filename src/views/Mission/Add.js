import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "react-select/dist/react-select.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { add } from "./../../api/firebase";
import Departments from "./../../components/Select/Departments";
import Employees from "./../../components/Select/Employees";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
  CardBody,
  CardFooter
} from "reactstrap";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      department: "",
      title: "",
      description: "",
      employee: "",
      date: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    const { user } = this.props;
    e.preventDefault();
    const data = {
      parentId: user.dataLogin.uid,
      employee: this.state.employee,
      department: this.state.department,
      title: this.state.title,
      description: this.state.description,
      date: this.state.date.toDate(),
      closing: null,
      status: "C",
      created: moment().unix()
    };
    console.log("data to create mission ==> ", data)
    add("missions", data);
    this.props.history.push("/mission");
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <CardBody>
              <Row>
                <Col sm={6} style={{ textAlign: "right" }}>
                  <Card>
                    <CardBody>
                      <FormGroup row>
                        <Label sm={4}>الدائرة</Label>
                        <Col sm={8}>
                          <Departments
                            onChange={v => {
                              this.setState({ department: v });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={4}>الموظف</Label>
                        <Col sm={8}>
                          <Employees
                            onChange={v => {
                              this.setState({ employee: v });
                            }}
                          />
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card>
                    <CardBody>
                      <FormGroup row>
                        <Label sm={3}>عنوان المهمة</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="name"
                            placeholder="عنوان المهمة"
                            onChange={e =>
                              this.setState({ title: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>وصف المهمة</Label>
                        <Col sm={9}>
                          <textarea
                            value={this.state.description}
                            name="description"
                            className="form-control"
                            placeholder="وصف المهمة"
                            onChange={event => {
                              this.setState({
                                description: event.target.value
                              });
                            }}
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={4}>التاريخ</Label>
                        <Col sm={8}>
                          <DatePicker
                            type="text"
                            placeholderText="زمن البداية"
                            className="form-control"
                            minDate={moment()}
                            isClearable={true}
                            selected={this.state.date}
                            onChange={(date) => this.setState({ date: date })}
                          />
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <button type="submit" className="btn btn-primary">
                حفظ
              </button>
            </CardFooter>
          </Form>
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

export default connect(mapStateToProps, null)(Add);
