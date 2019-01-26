import React from 'react'
import '../App.css';

const Guesser = (props) => {

  return (
    <form>
      <div className="form-group">

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => props.deleteCard(e)}
        >
          Delete Current Card
      </button>

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter .NameOfMethod Here"
          onChange={(e) => props.guessMethod(e)}
          value={props.userGuess}
        >
        </input>
      </div>
      
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => props.answerFunction(e)}
      >
        Guess Method
        </button>

      

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => props.addNewCardForm(e)}
      >
        Add New Method!
      </button>
    </form>
  )
}

export default Guesser;