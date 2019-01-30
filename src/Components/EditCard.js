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
          // value={props.name}
          // onChange={props.name}
        >
        </input>

        Description
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Description Here"
          // value={props.description}
          // onChange={props.description}
        >
        </input>

        Link
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Link Here"
          // value={props.link}
          // onChange={props.link}
        >
        </input>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
        // onClick={(e) => props.editCurrentCard(e)}
      >
        Edit!
      </button>

    </form>
  )
}

export default EditCard