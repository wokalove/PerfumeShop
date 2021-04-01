import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App = () => {
    const routing = useRoutes(routes(true));

    return <>{routing}</>;
};

export default App;
