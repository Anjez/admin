import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SHA1 from "crypto-js/sha1";
import Base64 from "crypto-js/enc-base64";
import { loginUser } from "./../../actions/userActions";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Form,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { email: "", password: "" };
  }

  componentDidMount() {
    if (this.props.user.dataLogin != null) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.dataLogin != null) {
      this.props.history.push("/dashboard");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const password = Base64.stringify(SHA1(this.state.password, "key"));
    this.props.loginUser(this.state.email, password);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1 className="text-right">تسجيل الدخول</h1>
                      <p className="text-muted text-right">إدخل بيانات الدخول إلى حسابك</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon>
                          <i className="icon-user" />
                        </InputGroupAddon>
                        <Input
                          type="email"
                          placeholder="الإيميل"
                          onChange={e =>
                            this.setState({ email: e.target.value })
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
                          placeholder="كلمة السر"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                          required
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            type="submit"
                          >
                            دخول
                          </Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>التسجيل</h2>
                      <p>
                        فقرة فيها وصف للتطبيقة
                      </p>
                      <Link
                        to={"/register"}
                        color="link"
                        className="btn btn-info"
                      >
                        التسجيل
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
