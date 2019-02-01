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
      flashcard: "",
      index: 0,
      name: "",
      description: "",
      link: "",
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

  flashCard = (e) => {
    e.preventDefault()
    this.setState({
      index: this.state.flashcards[this.state.index].id,
      name: this.state.flashcards[this.state.index].name,
      description: this.state.flashcards[this.state.index].description,
      link: this.state.flashcards[this.state.index].link,
      flashcard: this.state.flashcards[this.state.index]
    })
    if (this.state.index + 1 === this.state.flashcards.length) {
      this.setState({
        index: 0
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

    // if (this.state.flashcard.length - 1 === this.state.index) {
    //   this.setState({
    //     index: this.state.index - 1
    //   })
    // }
    
    await fetch(`http://localhost:3001/flashcards${this.state.flashcards[this.state.index].id}`, {
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
      index: this.state.index -1
    })
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

  addNewCard = async (e) => {
    e.preventDefault()
    var newCard = {
      id: this.state.flashcards.length,
      name: this.state.newMethod,
      description: this.state.newDescription,
      link: this.state.newLink,
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
      // index: this.state.flashcards.length -1,
      current: false
    })

  }

  editCurrentCard = (e) => {
    e.preventDefault()
    if (this.state.index > 0)
      this.setState({
        edit: !this.state.edit,
      })
  }


  saveChanges = async (e) => {
    e.preventDefault()
    const editedFlash = {
      name: this.state.newMethod,
      description: this.state.newDescription,
      link: this.state.newLink,
    }

    const mappedCards = this.state.flashcards.map(card => {
      if (this.state.index === card.id) {
        return editedFlash
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
      name: this.state.newMethod,
      description: this.state.newDescription,
      link: this.state.newLink,
      flashcards: mappedCards,
      edit: false,
      id: this.state.flashcard.id
    })
  }



  render() {

    return (
      <div className="container-fluid">
        <div className="row justify-content-center py-5">
          <div className="col-8 text-center">
            <h1 className="pb-2">JS FLashCards</h1>
            <p className="pb-2">Learning JS just got easy!</p>

            <ProgressBar />

            <Card
              flashcards={this.state.flashcards}
              id={this.state.id}
              name={this.state.name}
              description={this.state.description}
              link={this.state.link}
            />

            <button
              className="btn btn-danger btn-lg"
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
                id={this.state.id}
                name={this.state.name}
                description={this.state.description}
                link={this.state.link}
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
