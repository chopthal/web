import './app.css';
import React, { Component } from 'react';
import SearchForm from './components/searchForm';
import ShowList from './components/showList';

class App extends Component {
  state = {
      url : ['https://i.ytimg.com/vi/Z9dvM7qgN9s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3hUQZdK9LnPSfvb1Axj8RIHEx2A', 'https://i.ytimg.com/vi/Z9dvM7qgN9s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3hUQZdK9LnPSfvb1Axj8RIHEx2A'],
    };
    
    
  MAIN_ADDRESS = 'https://www.googleapis.com/youtube/v3/';
  KEY = 'AIzaSyDl0n55pbK9hYpWnwruRgFeWaRkPzp405Q';
  PART = 'snippet';
  MAX_RESULTS = 25;

  handleSearch = (event) => {
    event.preventDefault();
    this.searchQuery(this.inputRef.current.value)
    this.formRef.current.reset()
  };

  searchQuery = (q) => {
    const request = `${this.MAIN_ADDRESS}search?key=${this.KEY}&q=${q}&maxResults=${this.MAX_RESULTS}&part=${this.PART}`
    fetch(request).then((response)=> {
      return response.json();
    }).then((data) => {
      const url = new Array;
      data.items.forEach((item, idx) => {
        url[idx] = item.snippet.thumbnails.default.url;
      })
      this.setState({url})
    });

    
  }

  formRef = React.createRef();
  inputRef = React.createRef();

  render() {
    return (
    <>
    <header className = "navbar">
      <span><i className="fas fa-bars"></i></span>
      <span><i className="fab fa-youtube"></i></span>
      <SearchForm onSubmit={this.handleSearch} inputRef={this.inputRef} formRef = {this.formRef} />
    </header>
    <article>
      <ShowList url = {this.state.url}></ShowList>
    </article>
    </>
    );
  }
}
export default App;


