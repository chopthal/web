import React, { Component } from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css'

class VideoList extends Component {
  render() {
    return (
      <ul className={styles.list}>
        {this.props.videos.map(video => 
          <VideoItem
          title = {video.snippet.title}
          thumbnail = {video.snippet.thumbnails.medium.url}
          channelTitle = {video.snippet.channelTitle}
          ></VideoItem>)}
      </ul>
    );
  }
}

export default VideoList;