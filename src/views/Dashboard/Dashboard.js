import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row, Col} from 'reactstrap'

class Dashboard extends Component {

  componentDidMount() {
    console.log(this.props)
  }
  

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col style={{textAlign: "right"}}>
            <p>
              السلام عليكم
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    appData: state.firebaseReducer
  }
}

export default connect(
  mapStateToProps,
  null
)(Dashboard)
// export default Dashboard;
