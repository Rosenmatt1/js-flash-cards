import React from 'react'
import '../App.css';

const Guesser = (props) => {

  return (
    <form>
      <div className="form-group">

        <button
          type="submit"
          className="btn btn-primary my-1 mb-3"
          onClick={(e) => props.deleteCard(e)}
        >
          Delete Current Card
      </button>

        <input
          type="text"
          className="form-control"
          placeholder="Enter .NameOfMethod Here"
          onChange={(e) => props.guessMethod(e)}
          value={props.userGuess}
        >
        </input>
      </div>

      {!props.guessedAnswer
      ?
        <button
          type="submit"
          className="btn btn-danger btn-lg"
          onClick={(e) => props.answerFunction(e)}
        >
          Guess the Method
        </button>
      :
        <button
          type="submit"
          className="btn btn-success btn-lg"
          onClick={(e) => props.answerFunction(e)}
        >
          Correct!
        </button>
      }

      


      <br></br>

      <button
        type="submit"
        className="btn btn-primary my-2"
        onClick={(e) => props.addNewCardForm(e)}
      >
        Add New Method!
      </button>

    </form>
  )
}

export default Guesser;