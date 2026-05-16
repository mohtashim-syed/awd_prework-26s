import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('creators')
            .insert({ name, url, description, imageURL });

        if (error) {
            console.error('Error adding creator:', error);
            return;
        }

        setName('');
        setURL('');
        setDescription('');
        setImageURL('');
        navigate('/');
    };

    return (
        <div>
            <h1>Add a New Creator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Profile URL:</label>
                    <input type="url" value={url} onChange={(e) => setURL(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                </div>
                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;