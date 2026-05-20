import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    const { name } = useParams();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('name', name)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
                return;
            }

            setCreator(data);
        };

        fetchCreator();
    }, [name]);

    if (!creator) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{creator.name}</h1>

            {creator.imageURL && (
                <img src={creator.imageURL} alt={`${creator.name}'s profile`} width="200" />
            )}

            <p>{creator.description}</p>

            <a href={creator.url} target="_blank" rel="noopener noreferrer">
                Visit Profile
            </a>

            <Link to={`/edit/${encodeURIComponent(creator.name)}`}>
                <button>Edit Creator</button>
            </Link>
        </div>
    );
};

export default ViewCreator;