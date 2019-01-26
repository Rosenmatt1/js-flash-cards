import React, { Component } from 'react';
import './App.css';
import Card from './Components/Card.js'
import Guesser from './Components/Guesser'
import AddNewCard from './Components/AddNewCard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      flashcards: {},
      flashcard: "",
      id: 0,
      name: "",
      description: "",
      example: "",
      tags: [],
      link: "",
      userGuess: "",
      guessedAnswer: false,
      displayForm: false,
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/')
    const json = await response.json()
    let addSelected = json.map(card => {
      card.current = false
      
      return card
    })
    this.setState({ flashcards: addSelected })
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
      flashcard: this.state.flashcards[this.state.id]
    })
    if (this.state.id === this.state.flashcards.length - 1) {
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
    if (this.state.name === this.state.userGuess)
    this.setState({
      guessedAnswer: true,
      userGuess: "",
    })
  }

  deleteCard = (e) => {
    e.preventDefault()
    console.log(e)
    var removeCard = this.state.flashcards.filter(card => {
      console.log(card.id)
      if (this.state.flashcard.id === card.id)  {
        card.current = true
      }
      return !card.current
    })
    this.setState({
      flashcards: removeCard
    })
    console.log(removeCard)
  }

  addNewCard = (e) => {
    e.preventDefault()
    this.setState({
      displayForm: !this.state.displayForm,
    })
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
              userGuess={this.state.userGuess}
              deleteCard={this.deleteCard}
              addNewCard={this.addNewCard}
            />

            {!this.state.guessedAnswer
              ? <p>Please type your answer</p>
              : <p>You are correct</p>
            }

            {this.state.displayForm 
            ? <AddNewCard 
              />
            : <p></p>
          }
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
