import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink } from 'react-router-dom';
import Loading from 'src/components/Loading';
import axios from '../../../axiosConfig';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

// TODO: order id

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const tmpOrders = await axios.get('/admin/transactions?limit=5');
      setOrders(tmpOrders.data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order Id
                </TableCell>
                <TableCell>
                  Customer Id
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 && orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.user_id}
                  </TableCell>
                  <TableCell>
                    {order.product_id}
                  </TableCell>
                  <TableCell>
                    {moment(order.date).format('DD/MM/YYYY - hh:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {loading && <Loading />}
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          component={RouterLink}
          to="/app/orders"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
