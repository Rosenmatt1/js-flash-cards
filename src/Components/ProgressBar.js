import React from 'react'

const ProgressBar = (props) => {

  const calculate = (props.guessedCorrect / props.flashcards.length) * 100

  const style = {
    width: `${calculate}%`
  }

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
