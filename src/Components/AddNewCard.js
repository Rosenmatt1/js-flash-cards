import React from 'react'

const AddNewCard = (props) => {

  return (
    <form>
      <div className="form-group">

        Method
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New .NameOfMethod Here"
          onChange={props.addName}
        >
        </input>

        Description
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Description Here"
          onChange={props.addDescription}
        >
        </input>

        Link
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Link Here"
          onChange={props.addLink}
        >
        </input>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => props.addNewCard(e)}
      >
        Add!
      </button>

    </form>
  )
}

export default AddNewCard 




