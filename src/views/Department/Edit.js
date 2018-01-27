import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Maps from "./../../components/Maps/Maps";
import NumericInput from "react-numeric-input";
import { get, set, update } from "./../../api/firebase";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardFooter,
  Button
} from "reactstrap";
const DEFAULT_LOCATION = { lat: 24.781802, lng: 46.725966 };
class Add extends Component {
  constructor() {
    super();
    this.state = {
      radius: 20,
      center: {},
      reset: false,
      name: "",
      description: "",
      address: "",
      region: "",
      governorate: "",
      headmaster: "",
      phone: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentWillMount() {
    const { match: { params } } = this.props;
    get("departments", params.departmentId).then(doc => {
        if(!doc.exists){
            this.props.history.goBack();
            return;
        }
        this.setState(doc.data())
    });
  }

  async handleSubmit(e) {
    const { match: { params } } = this.props;
    e.preventDefault();
    const data = {
      radius: this.state.radius,
      center: this.state.center,
      name: this.state.name,
      description: this.state.description,
      address: this.state.address,
      region: this.state.region,
      governorate: this.state.governorate,
      headmaster: this.state.headmaster,
      phone: this.state.phone,
      email: this.state.email
    };
    await update("departments", params.departmentId, data);
    this.props.history.goBack();
  }

  updateLocation(value) {
    this.setState(value);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <CardBody>
            <Row>
            <Col>
              <FormGroup>
                <Label>Delivery area</Label>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col xs={2}>
                    <NumericInput
                      className="form-control"
                      min={1}
                      max={30}
                      value={this.state.radius}
                      onChange={value => {
                        this.setState({ radius: value });
                      }}
                    />
                  </Col>
                  <Col>
                    <Button
                      className="btn btn-warning"
                      onClick={() => this.cleared()}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
              <Row>
                <Col sm={6} style={{ textAlign: "right" }}>
                  <Card>
                    <CardBody>
                      <Maps
                        defaultLocation={DEFAULT_LOCATION}
                        radius={this.state.radius}
                        center={this.state.center}
                        isClear={this.cleared}
                        reset={this.state.reset}
                        onChange={this.updateLocation}
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card>
                    <CardBody>
                      <FormGroup row>
                        <Label sm={3}>إسم الدائرة</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="name"
                            value={this.state.name}
                            placeholder="إسم الدائرة"
                            onChange={e =>
                              this.setState({ name: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>وصف الدائرة</Label>
                        <Col sm={9}>
                          <textarea
                            value={this.state.description}
                            value={this.state.description}
                            className="form-control"
                            placeholder="وصف الدائرة"
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
                        <Label sm={3}>العنوان</Label>
                        <Col sm={9}>
                          <textarea
                            placeholder="العنوان"
                            value={this.state.address}
                            className="form-control"
                            onChange={e =>
                              this.setState({ address: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>المنطقة</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            value={this.state.region}
                            placeholder="المنطقة"
                            onChange={e =>
                              this.setState({ region: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>المحافظة</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            value={this.state.governorate}
                            placeholder="المحافظة"
                            onChange={e =>
                              this.setState({ governorate: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>إسم المسؤول</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            value={this.state.headmaster}
                            placeholder="إسم المسؤول"
                            onChange={e =>
                              this.setState({ headmaster: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>الهاتف</Label>
                        <Col sm={9}>
                          <Input
                            type="tel"
                            value={this.state.phone}
                            placeholder="الهاتف"
                            onChange={e =>
                              this.setState({ phone: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>البريد الالكتروني</Label>
                        <Col sm={9}>
                          <Input
                            type="email"
                            value={this.state.email}
                            placeholder="البريد الالكتروني"
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                            required
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
