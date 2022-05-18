class Youtube {
  constructor(key) {
    this.key = key;
  };

  requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  async requestVideoList(key) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${this.key}&chart=mostPopular&maxResults=25&part=snippet`, this.requestOptions);
    const result = await response.json();
    return result.items;
  };

  async requestSearchList(query)  {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${this.key}&q=${query}&maxResults=25&part=snippet`, this.requestOptions)
    const result = await response.json();
    return result.items;
  };

}

export default Youtube;