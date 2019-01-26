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
        >
        </input>

        Description
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Description Here"
        >
        </input>

        Example
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Example Here"
        >
        </input>

        Link
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter New Link Here"
        >
        </input>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Add!
      </button>

    </form>
  )
}

export default AddNewCard 




