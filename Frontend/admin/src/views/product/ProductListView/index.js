import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Loading from 'src/components/Loading';
import Page from 'src/components/Page';
import axios from '../../../axiosConfig';
import ProductCard from './ProductCard';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const tmpProducts = await axios.get('/api/products');
      setProducts(tmpProducts.data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.length > 0 && products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
          {loading && <Loading />}
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
