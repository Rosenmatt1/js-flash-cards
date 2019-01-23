import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Card from './Components/Card.js'
import data from './data.js'

class App extends Component {
  constructor () {
    super()
      this.state = {
        flashcards: [],
        flashcard: false,
        id: 0,
        name: "",
        description: "",
        example: "",
        tags: [],
        link: "",
        data: data

      }
  }

  componentDidMount() {
    // fetch("http://localhost:3000/data")
    fetch("./data.json")

      .then(data => data.json())
      .then(JSONdata => {
        console.log(JSONdata)
        this.setState({ flashcards: JSONdata.data.flashcards })
      })
  }

  flashCard = (e) => {
    e.preventDefault()
    console.log("Botton was clicked")
  }

  render() {
    

    return (
      <div className="container-fluid">
        <div className="row justify-content-center py-5">
          <div className="col-8 text-center">
            <h1 className="pb-2">JS FLashCards</h1>
            <p className="pb-2">Learning JS just got easy!</p>
            <button 
            className="btn btn-danger btn-lg" 
            onClick={this.flashCard}
            >
            Click to Study
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          {this.state.flashcard ? <Card
            id={this.state.id}
            name={this.state.name}
            description={this.state.description}
            example={this.state.example}
            tags={this.state.tags}
            link={this.state.link}
          />
            : <div></div>}
            
        </div>
      </div>
    );
  }
}

export default App;
