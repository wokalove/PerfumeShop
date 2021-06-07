import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Loading from 'src/components/Loading';
import axios from '../../../axiosConfig';

const useStyles = makeStyles(({
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const tmpProducts = await axios.get('/api/products');
      setProducts(tmpProducts.data.reverse());
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <Card
      className={className}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products.length > 0 && products.map((product, i) => i < 5 && (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={`http://localhost:8000${product.image}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`${product.volume} [ml]`}
            />
            <div>
              {`Price: $${product.price}`}
              <br />
              {`Offer: ${product.new_price ? `$${product.new_price}` : '-'}`}
            </div>
          </ListItem>
        ))}
      </List>
      <Divider />
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
          to="/app/products"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
