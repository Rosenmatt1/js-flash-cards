import React, { Component } from 'react';
import './App.css';
import Card from './Components/Card.js'
import Guesser from './Components/Guesser'
import AddNewCard from './Components/AddNewCard'
import EditCard from './Components/EditCard'
import ProgressBar from './Components/ProgressBar'

class App extends Component {
  constructor() {
    super()
    this.state = {
      flashcards: [],
      index: 0,
      userGuess: "",
      guessedAnswer: false,
      displayForm: false,
      newMethod: "",
      newDescription: "",
      newLink: "",
      edit: false,
      guessedCorrect: 0
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/flashcards')

    const json = await response.json()
    let addCurrent = json.map(card => {
      card.current = false
      return card
    })
    this.setState({ flashcards: addCurrent })
  }

  flashCard = () => {
    if (this.state.index !== this.state.flashcards.length - 1) this.setState({ index: this.state.index + 1 })
    if (this.state.index === this.state.flashcards.length - 1) this.setState({ index: 0 })
    this.setState({ guessedAnswer: false })
  }

  guessMethod = (e) => {
    this.setState({ userGuess: e.target.value })
  }

  answerFunction = (e) => {
    e.preventDefault()
    if (this.state.flashcards[this.state.index].name === this.state.userGuess)
      this.setState({
        guessedAnswer: true,
        userGuess: "",
        guessedCorrect: this.state.guessedCorrect + 1
      })
  }

  deleteCard = async (e) => {
    e.preventDefault()
    const removeCard = this.state.flashcards.filter(card => {
      if (card.id === this.state.flashcards[this.state.index].id) {
        card.current = true
      }
      return !card.current
    })
    await fetch(`http://localhost:3001/flashcards/${this.state.flashcards[this.state.index].id}`, {
      method: 'DELETE',
      body: JSON.stringify(removeCard),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState({
      flashcards: removeCard,
      displayForm: false,
      index: this.state.index - 1
    })
  }

  addNewCardForm = (e) => {
    e.preventDefault()
    this.setState({ displayForm: !this.state.displayForm })
  }

  addName = (e) => this.setState({ newMethod: e.target.value })

  addDescription = (e) => this.setState({ newDescription: e.target.value })

  addLink = (e) => this.setState({ newLink: e.target.value })

  addNewCard = async (e) => {
    e.preventDefault()
    var newCard = {
      id: this.state.flashcards.length + 1,
      name: this.state.newMethod,
      description: this.state.newDescription,
      link: this.state.newLink
    }
    await fetch('http://localhost:3001/flashcards', {
      method: 'POST',
      body: JSON.stringify(newCard),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState({
      flashcards: [...this.state.flashcards, newCard],
      displayForm: false,
      index: this.state.index + 1,
      current: false
    })
  }

  editCurrentCard = (e) => {
    e.preventDefault()
    this.setState({ edit: !this.state.edit })
  }

  saveChanges = async (e) => {
    e.preventDefault()
    const editedFlash = {
      id: this.state.flashcards[this.state.index].id,
      link: this.state.newLink,
      description: this.state.newDescription,
      name: this.state.newMethod
    }
    const mappedCards = this.state.flashcards.map(card => {
      if (this.state.flashcards[this.state.index].id === card.id) {
        this.state.flashcards[this.state.index].name = this.state.newMethod
        this.state.flashcards[this.state.index].description = this.state.newDescription
        this.state.flashcards[this.state.index].link = this.state.newLink
      }
      return card
    })
    await fetch(`http://localhost:3001/flashcards/${this.state.flashcards[this.state.index].id}`, {
      method: 'PUT',
      body: JSON.stringify(editedFlash),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState({
      flashcards: mappedCards,
      edit: false,
    })
  }


  render() {

    return (
      <div className="container-fluid">
        <div className="row justify-content-center py-5">
          <div className="col-8 text-center">
            <h1 className="pb-2">JS FLashCards</h1>
            <p className="pb-2">Learning JS just got easy!</p>

            <ProgressBar
              guessedCorrect={this.state.guessedCorrect}
              flashcards={this.state.flashcards}
            />

            {this.state.flashcards[0]
              ? <Card
                  flashcards={this.state.flashcards}
                  name={this.state.name}
                  description={this.state.description}
                  link={this.state.link}
                  index={this.state.index}
              />
              : <div></div>}

            <button
              className="btn btn-danger btn-lg mx-1"
              onClick={this.flashCard}
            >
              Click to Study
            </button>

            <button
              className="btn btn-danger btn-lg"
              onClick={this.editCurrentCard}
            >
              Edit Card
            </button>

            {this.state.edit
              ? <EditCard
                addName={this.addName}
                addDescription={this.addDescription}
                addLink={this.addLink}
                saveChanges={this.saveChanges}
                flashcards={this.state.flashcards}
                guessedCorrect={this.state.guessedCorrect}
              />
              : <div></div>}

            <Guesser
              guessMethod={this.guessMethod}
              answerFunction={this.answerFunction}
              userGuess={this.state.userGuess}
              deleteCard={this.deleteCard}
              addNewCardForm={this.addNewCardForm}
              guessedAnswer={this.state.guessedAnswer}
            />

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
