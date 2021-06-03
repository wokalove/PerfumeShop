import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  makeStyles, SvgIcon, TextField
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
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
  setCustomers,
  setLoading,
  ...rest
}) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setCustomers([]);
    setLoading(true);
    const tmpCustomers = await axios.get(`/admin/users?email=${searchValue}`);
    setCustomers(tmpCustomers.data);
    setLoading(false);
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
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
                  placeholder="Find customer"
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
  setCustomers: PropTypes.func,
  setLoading: PropTypes.func
};

export default Toolbar;
