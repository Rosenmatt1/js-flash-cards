import React from 'react'

const ProgressBar = (props) => {

  var calculate = (props.guessedCorrect / props.flashcards.length) * 100

  var style = {
    width: `${calculate}%`
  }

  
  // console.log(calculate)

  return (
   
    <div className="progress">
      <div 
        className="progress-bar" 
        role="progressbar" 
        style={style}
        aria-valuenow={`${calculate}%`}
        aria-valuemin="0" 
        aria-valuemax="100">
        {calculate}
      </div>
    </div>
  
    
  ) 
}

export default ProgressBar;
