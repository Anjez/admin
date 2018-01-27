import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import SHA1 from "crypto-js/sha1";
import Base64 from "crypto-js/enc-base64";
import {
  getStorageReference,
  add,
  creatUser,
  set,
  update,
  get
} from "./../../api/firebase";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardFooter
} from "reactstrap";

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      src: "/img/drag-and-drop-icon.png",
      name: "",
      familyName: "",
      email: "",
      password: "",
      phone: "",
      image: "",
      nationality: "",
      identity: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { match: { params } } = this.props;
    console.log(params)
    // get("employees",params.userId)
  }

  onDrop(files) {
    this.setState({
      files,
      src: files[0].preview
    });
  }

  async handleSubmit(e) {
    const { user } = this.props;
    e.preventDefault();
    const data = {
      parentId: user.dataLogin.uid,
      name: this.state.name,
      familyName: this.state.familyName,
      email: this.state.email,
      password: Base64.stringify(SHA1(this.state.password, "key")),
      phone: this.state.phone,
      nationality: this.state.nationality,
      identity: this.state.identity
    };

    const userCreated = await creatUser(this.state.email, this.state.password);
    const uid = userCreated.uid;
    await set("employees", uid, data);
    if (this.state.files.length > 0) {
      let strorageRef = getStorageReference("employees/" + uid);
      let fileDowloaded = await strorageRef.put(this.state.files[0]);
      await update("employees", uid, { image: fileDowloaded.downloadURL });
    }
    this.props.history.push("/users");
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <CardBody>
              <Row>
                <Col sm={4} style={{ textAlign: "right" }}>
                  <Card>
                    <CardBody>
                      <Dropzone
                        style={{
                          borderWidth: 2,
                          borderColor: "rgb(102, 102, 102)",
                          borderStyle: "dashed",
                          borderRadius: 5
                        }}
                        accept="image/jpeg, image/png"
                        onDrop={this.onDrop.bind(this)}
                      >
                        <CardImg
                          width="200"
                          height="200"
                          src={this.state.src}
                        />
                      </Dropzone>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={8}>
                  <Card>
                    <CardBody>
                      <FormGroup row>
                        <Label sm={3}>الإسم</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="name"
                            placeholder="الإسم"
                            onChange={e =>
                              this.setState({ name: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>اللقب</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="familyName"
                            placeholder="اللقب"
                            onChange={e =>
                              this.setState({ familyName: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>البريد الالكتروني</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="email"
                            placeholder="البريد الالكتروني"
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>كلمة السر</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="password"
                            placeholder="كلمة السر"
                            onChange={e =>
                              this.setState({ password: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>الجنسية</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="nationality"
                            placeholder="الجنسية"
                            onChange={e =>
                              this.setState({ nationality: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>رقم الهوية</Label>
                        <Col sm={9}>
                          <Input
                            type="text"
                            name="identity"
                            placeholder="رقم الهوية"
                            onChange={e =>
                              this.setState({ identity: e.target.value })
                            }
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>رقم الجوال</Label>
                        <Col sm={9}>
                          <Input
                            type="tel"
                            name="text"
                            placeholder="رقم الجوال"
                            onChange={e =>
                              this.setState({ phone: e.target.value })
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

export default connect(mapStateToProps, null)(Edit);
