import React from 'react';
import '../App.css';
// import Button from './Button.js'

const Card = (props) => {
  return (
    <div className="row justify-content-center">
      <div className="card col-lg-8 mx-2 my-2">
        <div className="card-body">
          <h5 className="card-title"><h3>Name:</h3> {props.name}</h5>
          <h5 className="card-text"><h3>Description:</h3> {props.description}</h5>
          <h5 className="card-text"><h3>Example:</h3> {props.example}</h5>
          <h5 className="card-text"><h3>Tags:</h3> {props.tags}</h5>
          <h5 className="card-text"><h3>Link:</h3> {props.link}</h5>
        </div>
      </div>
    </div>
  )
}

export default Card;
