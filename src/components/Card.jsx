import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ name, url, description, imageURL }) => {
    return (
        <article>
            <Link to={`/view/${encodeURIComponent(name)}`} className="card-link">
                {imageURL && <img src={imageURL} alt={`${name}'s profile`} className="card-image" />}
                <h2>{name}</h2>
                <p>{description}</p>
            </Link>

            <a href={url} target="_blank" rel="noopener noreferrer">Visit Profile</a>

            <Link to={`/edit/${encodeURIComponent(name)}`}>
                <button>Edit</button>
            </Link>
        </article>
    );
};

export default CreatorCard;