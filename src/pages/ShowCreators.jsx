import React from 'react';
import { Link } from 'react-router-dom';
import CreatorCard from '../components/Card';

const ShowCreators = ({ creators }) => {
    return (
        <div>
            <h1>All Creators</h1>

            <Link to="/new">
                <button>Add a Creator</button>
            </Link>

            {creators && creators.length > 0 ? (
                <div className="creators-grid">
                    {creators.map((creator) => (
                        <CreatorCard
                            key={creator.name}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                        />
                    ))}
                </div>
            ) : (
                <p>No content creators have been added yet.</p>
            )}
        </div>
    );
};

export default ShowCreators;