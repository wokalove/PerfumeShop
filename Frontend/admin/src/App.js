import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import routes from 'src/routes';
import theme from 'src/theme';

const App = () => {
  const authState = useSelector((state) => state.auth);
  const routing = useRoutes(routes(authState.isLoggedIn));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
