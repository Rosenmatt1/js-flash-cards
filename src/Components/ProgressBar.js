import React from 'react'

const ProgressBar = (props) => {

  var style = {
    width: "25%",
    height: "20%"
  }

  // var calculate = (props.guessedCorrect /props.flashcards.length) * 100
  // console.log(calculate)

  return (
   
    <div className="progress">
      <div 
        className="progress-bar" 
        role="progressbar" 
        style={style}
      aria-valuenow="25" 
      aria-valuemin="0" 
      aria-valuemax="100">
      {/* {calculate} */}
      </div>
    </div>
  
    
  ) 
}

export default ProgressBar;
