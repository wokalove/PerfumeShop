import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import data from './data';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
  }
}));

const OrdersListView = () => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Orders"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results orders={orders} />
        </Box>
      </Container>
    </Page>
  );
};

export default OrdersListView;
