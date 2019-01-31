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
      edit: false
    }
  }

  async componentDidMount() {
    const response = await fetch('https://jsflashcards.herokuapp.com/')

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
      id: this.state.id + 1,
      name: this.state.flashcards[this.state.id].name,
      description: this.state.flashcards[this.state.id].description,
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

  // deleteCard = (e) => {
  //   e.preventDefault()
  //   var removeCard = this.state.flashcards.filter(card => {
  //     if (this.state.flashcard.id === card.id)  {
  //       card.current = true
  //     }
  //     return !card.current
  //   })
  //   fetch('http://localhost:3001/flashcards', {
  //     method: 'DELETE',
  //     body: JSON.stringify(removeCard),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(flashcards => {
  //       this.setState({
  //         flashcards: removeCard,
  //         displayForm: false
  //       })
  //       return flashcards
  //     })
  // }

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
    e.preventDefault()
    var newCard = {
      id: this.state.flashcards.length + 1,
      name: this.state.newMethod,
      description: this.state.newDescription,
      link: this.state.newLink,
    }
    fetch('https://jsflashcards.herokuapp.com/flashcards/', {
      method: 'POST',
      body: JSON.stringify(newCard),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(flashcards => {
        console.log(flashcards)
        this.setState({
          flashcards: [...this.state.flashcards, flashcards],
          displayForm: false
        })
        return flashcards
      })
  }

  editCurrentCard = (e) => {
    e.preventDefault()
    this.setState({
      edit: !this.state.edit
    })
  }

  saveChanges = (e) => {
    e.preventDefault()
    this.setState({
      name: this.state.newMethod,
      description: this.state.newDescription,
      link: this.state.newLink,
      edit: false
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
