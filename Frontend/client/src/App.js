import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyles';
import routes from './routes';

const App = () => {
    const authState = useSelector((state) => state.auth);
    const routing = useRoutes(routes(authState.isLoggedIn));

    return (
        <>
            <GlobalStyle />
            {routing}
        </>
    );
};

export default App;
