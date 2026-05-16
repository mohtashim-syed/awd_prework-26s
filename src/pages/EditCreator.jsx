import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
                return;
            }

            setName(data.name ?? '');
            setURL(data.url ?? '');
            setDescription(data.description ?? '');
            setImageURL(data.imageURL ?? '');
        };

        fetchCreator();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', id);

        if (error) {
            console.error('Error updating creator:', error);
            return;
        }

        navigate('/');
    };

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error deleting creator:', error);
            return;
        }

        if (!data || data.length === 0) {
            console.error('Delete returned 0 rows — likely blocked by Row Level Security. Check the creators table policies in the Supabase dashboard.');
            return;
        }

        navigate('/');
    };

    return (
        <div>
            <h1>Edit Creator</h1>
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
                <button type="submit">Update Creator</button>
            </form>

            <button onClick={handleDelete}>Delete Creator</button>
        </div>
    );
};

export default EditCreator;