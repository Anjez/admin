import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SHA1 from "crypto-js/sha1";
import Base64 from "crypto-js/enc-base64";
import { registerUser } from "./../../actions/userActions";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      classError: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.user.dataLogin != null) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.dataLogin != null) {
      this.props.history.push("/dashboard");
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: this.state.username,
      email: this.state.email,
      password: Base64.stringify(SHA1(this.state.password, "key"))
    };
    this.props.registerUser(data);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1 className="text-right">التسجيل</h1>
                    <p className="text-muted text-right">إنشاء الحساب</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-user" />
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="الإسم"
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>@</InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="الإيميل"
                        onChange={e => this.setState({ email: e.target.value })}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-lock" />
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="كلمة السر"
                        className={this.state.classError}
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon>
                        <i className="icon-lock" />
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="إعادة كلة السر"
                        className={this.state.classError}
                        onChange={e => {
                          let classError =
                            e.target.value != this.state.password
                              ? "is-invalid"
                              : "";
                          this.setState({
                            repeatPassword: e.target.value,
                            classError: classError
                          });
                        }}
                        required
                      />
                    </InputGroup>
                    <Button type="submit" color="success" block>
                      التسجيل
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser }, dispatch);
}
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
