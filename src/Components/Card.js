import React from 'react';
import '../App.css';
// import Button from './Button.js'

const Card = (props) => {
  return (
    <div className="row justify-content-center">
      <div className="card col-lg-8 mx-2 my-2">
        <div className="card-body">
          <h5 className="card-title">Name: {props.name}</h5>
          <h5 className="card-text">Description: {props.description}</h5>
          <h5 className="card-text">Example: {props.example}</h5>
          <h5 className="card-text">Link: {props.link}</h5>
        </div>
      </div>
    </div>
  )
}

export default Card;
