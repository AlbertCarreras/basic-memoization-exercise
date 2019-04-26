import React  from 'react';
import memoize from 'memoize-one';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      search: "",
      youTubeKey: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.cleanState = this.cleanState.bind(this)
    this.fetchSongs = this.fetchSongs.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  cleanState() {
    this.setState({
      youTubeKey: "",
      search: ""
    })
  }

  saveCleanArray({items}) {
    return items.map(item => ({title: item.snippet.title.replace(/&#39;/, "'"), id: item.id.videoId}))
  }

  async fetchSongs() {
    if (this.state.youTubeKey !== "") {

      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURI(this.state.search)}&type=video&key=${this.state.youTubeKey}`;

      try {
        let resp  = await fetch(url)

        this.setState({
            videos: this.saveCleanArray(await resp.json())
        })
      }
      catch(error) {
        this.cleanState()
      } 
    }
  }

  buildList = memoize( (videos) => {
    console.log("inside memoize")
    return videos.map(item => {
      return <div key={item.id}>
                <h3>{item.title}</h3>
                <iframe 
                    title={item.title} 
                    width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${item.id}`}>
                </iframe>
              </div>
      })
    }
  )

  render() {

    const builtList = this.buildList(this.state.videos)

    console.log("render")
    
    return (
      <div className="App">
        <input
          type="text"
          name="youTubeKey"
          placeholder="Enter YouTube API key"
          onChange={this.handleChange}
          value={this.state.youTubeKey}
        >
        </input>

        <input
          type="text"
          name="search"
          onChange={this.handleChange}
          value={this.state.search}
        >
        </input>

        <input
          type="submit"
          onClick={this.fetchSongs}
          value="Search"
        ></input>
        
        <header className="App-header">
          <div>{builtList}</div>
        </header>
      </div>
    )
  }
}

export default App;
