import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ id, name, url, description, imageURL }) => {
    return (
        <div className="card">
            {imageURL && <img src={imageURL} alt={`${name}'s profile`} className="card-image" width="150" />}

            <h2>{name}</h2>

            <p>{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Visit Profile</a>

            <Link to={`/edit/${id}`}>
                <button>Edit</button>
            </Link>
        </div>
    );
};

export default CreatorCard;