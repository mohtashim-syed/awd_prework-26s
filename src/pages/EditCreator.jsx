import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
    const { name: originalName } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            setLoading(true);
            setErrorMsg('');

            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('name', originalName)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
                setErrorMsg(`Could not load creator (name=${originalName}): ${error.message}`);
                setLoading(false);
                return;
            }

            if (!data) {
                setErrorMsg(`No creator found with name=${originalName}.`);
                setLoading(false);
                return;
            }

            setName(data.name ?? '');
            setURL(data.url ?? '');
            setDescription(data.description ?? '');
            setImageURL(data.imageURL ?? '');
            setLoading(false);
        };

        fetchCreator();
    }, [originalName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('name', originalName);

        if (error) {
            console.error('Error updating creator:', error);
            setErrorMsg(`Update failed: ${error.message}`);
            return;
        }

        navigate('/');
    };

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('creators')
            .delete()
            .eq('name', originalName)
            .select();

        if (error) {
            console.error('Error deleting creator:', error);
            setErrorMsg(`Delete failed: ${error.message}`);
            return;
        }

        if (!data || data.length === 0) {
            const msg = 'Delete returned 0 rows — likely blocked by Row Level Security. In the Supabase dashboard, open the "creators" table → Authentication → Policies and add a policy that allows DELETE for the anon role.';
            console.error(msg);
            setErrorMsg(msg);
            return;
        }

        navigate('/');
    };

    if (loading) {
        return <p>Loading creator...</p>;
    }

    return (
        <div>
            <h1>Edit Creator</h1>

            {errorMsg && (
                <p style={{ color: 'crimson', whiteSpace: 'pre-wrap' }}>{errorMsg}</p>
            )}

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