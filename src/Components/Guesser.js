import React from 'react'
import '../App.css';

const Guesser = (props) => {

  return (
    <form>
      <div class="form-group">
        
        <input
          type="text"
          class="form-control mt-3"
          placeholder="Enter .NameOfMethod Here"
          onChange={(e) => props.guessMethod(e)}
        >
        </input>
      </div>
      {/* <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
        <label class="form-check-label" for="exampleCheck1">Remove Card</label>
      </div> */}
      <button 
        type="submit" 
        class="btn btn-primary"
        onClick={(e) => props.answerFunction(e)}
        >
        Guess Method
        </button>
    </form>
  )
}

export default Guesser;