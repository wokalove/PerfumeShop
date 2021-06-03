import {
  Box,
  Card,
  makeStyles, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel, TextField, Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loading from 'src/components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const status = [
  {
    value: 'pending',
    label: 'pending'
  },
  {
    value: 'sent',
    label: 'sent'
  },
  {
    value: 'delivered',
    label: 'delivered'
  }
];

// TODO: id
// TODO: status

const Results = ({
  className,
  orders,
  loading,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Product Id
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Quantity
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
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
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
                    {`$${order.price * order.quantity}`}
                  </TableCell>
                  <TableCell>
                    {order.quantity}
                  </TableCell>
                  <TableCell>
                    {moment(order.date).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      name="status"
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                    >
                      {status.map((option) => (
                        <option
                          key={option.status}
                          value={option.status}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Loading />}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Results;
