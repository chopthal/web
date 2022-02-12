import React, { Component } from 'react'
import styles from './search_form.module.css'

export default class SearchForm extends Component {
  render() {
    return (
      <header>
        <img src="/images/logo.png" className = {styles.youtubeIcon}></img>
        <span className = {styles.title}>Youtube</span>
        <form className = {styles.searchForm} ref = {this.props.refSubmit} onSubmit={this.props.onSubmit} type="search">
          <input ref = {this.props.refInput} type="search" placeholder='Search..'/>
          <button type="search"><img src="/images/search.png" alt="" />
          </button>
        </form>
      </header>
    )
  }
}
