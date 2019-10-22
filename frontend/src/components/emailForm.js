// App.js
import React, { Component } from 'react';
import { connect } from 'react-redux'


class Can extends Component {
  constructor() {
    super();
    this.state = {  };
  }



  render() {
    return (
      <div className="">
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(Can);