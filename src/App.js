import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Card from './Components/Card.js'
import data from './data.json'

class App extends Component {
  constructor () {
    super()
      this.state = {
        flashcards: data,
        id: 0,
        name: "",
        description: "",
        example: "",
        tags: [],
        link: "",
      }
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000/data")
  //   fetch("./data.json")

  //     .then(data => data.json())
  //     .then(JSONdata => {
  //       console.log(JSONdata)
  //       this.setState({ flashcards: JSONdata.data.flashcards })
  //     })
  // }

  flashCard = (e) => {
    e.preventDefault()
    this.setState({
      id: this.state.id + 1,
      name: this.state.flashcards.methods[this.state.id].name,
      description: this.state.flashcards.methods[this.state.id].description,
      example: this.state.flashcards.methods[this.state.id].example,
      tags: this.state.flashcards.methods[this.state.id].tags,
      link: this.state.flashcards.methods[this.state.id].link,
    })
    console.log(this.state.id)
    console.log(this.state.flashcards.methods.length -1)
    if (this.state.id === this.state.flashcards.methods.length -1) {
      this.setState({
        id: 0,
      })
    }
  }

  render() {
    

    return (
      <div className="container-fluid">
        <div className="row justify-content-center py-5">
          <div className="col-8 text-center">
            <h1 className="pb-2">JS FLashCards</h1>
            <p className="pb-2">Learning JS just got easy!</p>

            <Card
              flashcards={this.state.flashcards}
              id={this.state.id}
              name={this.state.name}
              description={this.state.description}
              example={this.state.example}
              tags={this.state.tags}
              link={this.state.link}
            />

            <button 
              className="btn btn-danger btn-lg" 
              onClick={this.flashCard}
            >
            Click to Study
            </button>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
