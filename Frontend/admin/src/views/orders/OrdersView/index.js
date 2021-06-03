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

const OrdersListView = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const tmpOrders = await axios.get('/admin/transactions');
      setOrders(tmpOrders.data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Orders"
    >
      <Container maxWidth={false}>
        <Toolbar setOrders={setOrders} setLoading={setLoading} />
        <Box mt={3}>
          <Results orders={orders} loading={loading} />
        </Box>
      </Container>
    </Page>
  );
};

export default OrdersListView;
