import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit} ref = {this.props.formRef}>
      <input type="text" ref={this.props.inputRef}/>
      <button><i className="fas fa-search"></i></button>
    </form>
    );
  }
}

export default SearchForm;