import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

const App = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select();

      if (error) {
        console.error('Error fetching creators:', error);
        return;
      }

      setCreators(data);
    };

    fetchCreators();
  }, []);

  const element = useRoutes([
    { path: '/', element: <ShowCreators creators={creators} /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/view/:id', element: <ViewCreator /> },
  ]);

  return <div className="App">{element}</div>;
};

export default App;