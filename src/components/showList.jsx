import React, { Component } from 'react';
import Content from './content';

class ShowList extends Component {

  render() {
    return (
      <ul>
        { this.props.url.map((item) =>
          <Content url = {item}>            
          </Content>
        )}
      </ul>
    );
  }
}

export default ShowList;