import './app.css';
import React, { Component } from 'react'
import VideoList from './components/video_list/video_list';
import SearchForm from './components/search_form/search_form';

export default class App extends Component {
  state = {
    videos : [],
  };

  getVideos = (promise) => {
    promise.then((videos)=> this.setState({videos}));
  }

  componentDidMount() {
    const promise = this.props.youtube.requestVideoList();
    this.getVideos(promise);
  };

  refInput = React.createRef();
  handleSubmit = (event) => {
    event.preventDefault();
    const query = this.refInput.current.value;
    const promise = this.props.youtube.requestSearchList(query);
    this.getVideos(promise);
  }
  
  render() {
    return (
      <>
      <SearchForm refInput = {this.refInput} onSubmit = {this.handleSubmit}></SearchForm>
      <VideoList videos = {this.state.videos}></VideoList>
      </>
    )
  }
}
