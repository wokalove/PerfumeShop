import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import axios from '../../../axiosConfig';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const tmpCustomers = await axios.get('/admin/users'); // TODO: endpoint
      console.log(tmpCustomers.data);
      setCustomers(tmpCustomers.data);
    };
    loadCustomers();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
