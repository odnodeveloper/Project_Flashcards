import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const DeckCard = () =>  {


  const viewHandle = (id) => {
    console.log("view button clicked");
  };

  const studyHandle = () => {
    console.log("study button clicked")
  };

  const deleteHandle = () => {
    console.log("delete button clicked")
  };

  const deckId = 1;


  return (
    <div className="card">
      <div className="card-body">
      <div>
        <h1 style={{display: "inline"}}>Header</h1>
        <p style={{display: "inline"}}>Text in the same line as header</p>
      </div>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <button className="btn btn-secondary" onClick={viewHandle}>
          <FontAwesomeIcon icon={faEye} />
            view
        </button>
        <button className="btn btn-primary" onClick={studyHandle}>
        <FontAwesomeIcon icon={faBookBookmark} />
          <Link to={`/deck/${deckId}/study`}>
            study
          </Link>
        </button>
        <button className="btn btn-danger" onClick={deleteHandle}>
        <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      </div> 
  )
}

export default DeckCard;
