import React from 'react'
import '../App.css';

const Guesser = (props) => {

  return (
    <form>
      <div class="form-group">
        <label for="exampleInputPassword1">
          Password
          </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        >
        </input>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  )
}

export default Guesser;