import React from 'react'

const EditCard = (props) => {

  return (
    <form>
      <div className="form-group">

        Method
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New .NameOfMethod Here"
          // default value={props.name}
          onChange={props.addName}
        >
        </input>

        Description
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Description Here"
          // default value={props.description}
          onChange={props.addDescription}
        >
        </input>

        Link
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Link Here"
          // default value={props.link}
          onChange={props.addLink}
        >
        </input>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => props.saveChanges(e)}
      >
        Save Edit!
      </button>

    </form>
  )
}

export default EditCard