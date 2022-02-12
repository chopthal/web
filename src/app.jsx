import './app.css';
import React, { Component } from 'react'
import VideoList from './components/video_list/video_list';
import SearchForm from './components/search_form/search_form';

export default class App extends Component {
  state = {
    videos : [],
  };

  componentDidMount() {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const requestVideoList = () => {
      fetch("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDtZS50hamnv1YdPhccCs_aw7ukaCvYBzg&chart=mostPopular&maxResults=25&part=snippet", this.requestOptions)
      .then(response => response.json())
      .then(result => this.setState({videos : result.items}));
    }

    requestVideoList();
  }

  refInput = React.createRef();

  handleSubmit = (event) => {
    event.preventDefault();

    const q = this.refInput.current.value;
    const requestVideoList = () => {
      fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDl0n55pbK9hYpWnwruRgFeWaRkPzp405Q&q=${q}&maxResults=25&part=snippet`, this.requestOptions)
      .then(response => response.json())
      .then(result => this.setState({videos : result.items}));
    }

    requestVideoList();

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
