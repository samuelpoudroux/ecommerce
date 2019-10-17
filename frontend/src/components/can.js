// App.js
import React, { Component } from 'react';
import { connect } from 'react-redux'


class Can extends Component {
  constructor() {
    super();
    this.state = {  };
  }

  renderComponent(){
      if(this.props.user.isAdmin) {
       return <div> {this.props.children}</div> 
    } else {
        return null
    }

  }

  render() {
    return (
      <div className="">
        {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(Can);