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
      link: "",
      userGuess: "",
      guessedAnswer: false,
      displayForm: false,
      newMethod: "",
      newDescription: "",
      newLink: "",
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

  addNewCardForm = (e) => {
    e.preventDefault()
    this.setState({
      displayForm: !this.state.displayForm,
    })
  }

  addName = (e) => {
    this.setState({
      newMethod: e.target.value,
    })
  }

  addDescription = (e) => {
    this.setState({
      newDescription: e.target.value,
    })
  }

  addLink = (e) => {
    this.setState({
      newLink: e.target.value,
    })
  }

  addNewCard = (e) => {
   var newCard = {
     id: this.state.flashcards.length + 1,
     newMethod: this.state.newMethod,
     newDescription: this.state.newDescription,
     newLink: this.state.newLink,
   }
   this.setState({
     flashcards: [...this.state.flashcards, newCard]
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
              addNewCardForm={this.addNewCardForm}
            />

            {!this.state.guessedAnswer
              ? <p>Please type your answer</p>
              : <p>You are correct</p>
            }

            {this.state.displayForm 
            ? <AddNewCard 
                addName={this.addName}
                addDescription={this.addDescription}
                addLink={this.addLink}
                addNewCard={this.addNewCard}
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
