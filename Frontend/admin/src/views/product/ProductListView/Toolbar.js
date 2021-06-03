import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  makeStyles, SvgIcon, TextField
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';
import axios from '../../../axiosConfig';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({
  className,
  setProducts,
  setLoading,
  ...rest
}) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setProducts([]);
      setLoading(true);
      const url = `/api/products${searchValue ? `?name=${searchValue}` : ''}`;
      const tmpProducts = await axios.get(url);
      setProducts(tmpProducts.data);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          component={RouterLink}
          to="/app/addProduct"
        >
          Add product
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <form onSubmit={handleSubmit}>
                <TextField
                  onChange={(event) => setSearchValue(event.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search product"
                  variant="outlined"
                />
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  setProducts: PropTypes.func,
  setLoading: PropTypes.func
};

export default Toolbar;
