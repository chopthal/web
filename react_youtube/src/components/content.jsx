import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <li>
        <span>Image</span>
        <img src={this.props.url}/>
      </li>
    );
  }
}

export default Content;