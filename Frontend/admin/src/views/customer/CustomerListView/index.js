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
    paddingBottom: theme.spacing(3),
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      const tmpCustomers = await axios.get('/admin/users');
      setCustomers(tmpCustomers.data);
      setLoading(false);
    };
    loadCustomers();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar setCustomers={setCustomers} setLoading={setLoading} />
        <Box mt={3}>
          <Results customers={customers} loading={loading} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
