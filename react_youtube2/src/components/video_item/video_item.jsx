import React, { Component } from 'react'
import styles from './video_item.module.css'

export default class VideoItem extends Component {
  render() {
    return (
      <li className={styles.list}>
        <img className={styles.thumbnail} src={this.props.thumbnail} alt="thumbnail" />
        <div className={styles.info}>
          <span className={styles.title}>{this.props.title}</span>
          <span className={styles.channelTitle}>{this.props.channelTitle}</span>
        </div>
        
      </li>
    )
  }
}
