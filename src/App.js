import React, { Component } from 'react';
import './App.css';
import Card from './Components/Card.js'
import Guesser from './Components/Guesser'

class App extends Component {
  constructor () {
    super()
      this.state = {
        flashcards: {},
        id: 0,
        name: "",
        description: "",
        example: "",
        tags: [],
        link: "",
        userGuess: "",
        guessedAnswer: false,
      }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/')
    const json = await response.json()
    this.setState({ flashcards: json })
  }

  flashCard = (e) => {
    e.preventDefault()
    this.setState({
      id: this.state.id + 1,
      name: this.state.flashcards[this.state.id].name,
      description: this.state.flashcards[this.state.id].description,
      example: this.state.flashcards[this.state.id].example,
      tags: this.state.flashcards[this.state.id].tags,
      link: this.state.flashcards[this.state.id].link,
    })
    if (this.state.id === this.state.flashcards.length -1) {
      this.setState({
        id: 0,
      })
    }
  }

  guessMethod = (e) => {
    this.setState({
      userGuess: e.target.value
    })
  }

  answerFunction = (e) => {
    e.preventDefault()
    if (this.state.userGuess === this.state.name) {
      this.setState({
        guessedAnswer: true,
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
            <Guesser
              guessMethod={this.guessMethod}
              answerFunction={this.answerFunction}
            />

            {/* {!this.state.guessedAnswer ? <p>Guess a Method!</p> 
            : this.state.userGuess !== this.state.name
            ? <p>Sorry try again</p>
            :<p>You are Correct!</p> } */}

            {this.state.guessedAnswer ? <p>You are correct</p> : <p>Sorry try again</p>
            
            }

          </div>
        </div>
        </div>
    );
  }
}

export default App;
