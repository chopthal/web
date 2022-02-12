import React, { Component } from 'react'
import styles from './search_form.module.css'

export default class SearchForm extends Component {
  render() {
    return (
      <header>
        <span className = {styles.youtubeIcon}><i className= "fa-brands fa-youtube"></i></span>
        <span className = {styles.title}>YOUTUBE</span>
        <form className = {styles.searchForm} ref = {this.props.refSubmit} onSubmit={this.props.onSubmit}>
          <input ref = {this.props.refInput} type="text" placeholder='Search..'/>
          <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </header>
    )
  }
}
