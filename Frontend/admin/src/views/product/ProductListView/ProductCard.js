import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,

  makeStyles, Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover img': {
      transform: 'scale(1.05)'
    }
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    transition: 'transform ease-in-out 200ms'
  }
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
        >
          <img
            className={classes.statsIcon}
            src={`http://localhost:8000${product.image}`}
            style={{ height: '200px' }}
            alt=""
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`${product.volume} [ml]`}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {`Price: $${product.price}`}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {`Offer: ${product.new_price ? `$${product.new_price}` : '-'}`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
