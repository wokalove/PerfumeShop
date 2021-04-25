import React from 'react';
import { useRoutes } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyles';
import routes from './routes';

const App = () => {
    const routing = useRoutes(routes(true));

    return (
        <>
            <GlobalStyle />
            {routing}
        </>
    );
};

export default App;
