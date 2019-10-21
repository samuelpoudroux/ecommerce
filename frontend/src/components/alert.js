import React, { Component } from 'react';

export default class Alert extends Component {
  render() {
      console.log(this.props.msg)
    if (this.props.msg === '') {
      return '';
    } else {
      return (
        <div className={this.cssClasses()} role="alert">
          {/* <span>{this.props.msg}</span> */}
        </div>
      );
    }
  }

  cssClasses() {
    const typeClass = 'alert-' + this.props.style;
    return ['alert', typeClass].join(', ');
  }
}

