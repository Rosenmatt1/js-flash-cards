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
    console.log("Botton was clicked")
    console.log(this.state.flashcards.methods[0].name)
    this.setState({
      name: this.state.flashcards.methods[0].name,
      description: this.state.flashcards.methods[0].description,
      example: this.state.flashcards.methods[0].example,
      // tags: flashcards[0].tags,
      link: this.state.flashcards.methods[0].link,
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
          </div>
        </div>
        <div className="row justify-content-center">

          
          {/* {this.state.flashcard ? <Card
            id={this.state.id}
            name={this.state.name}
            description={this.state.description}
            example={this.state.example}
            tags={this.state.tags}
            link={this.state.link}
          />
            : <div></div>} */}
            
        </div>
      </div>
    );
  }
}

export default App;
