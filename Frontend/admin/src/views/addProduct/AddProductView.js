import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const volume = [
  {
    value: '30ml',
    label: '30ml'
  },
  {
    value: '50ml',
    label: '50ml'
  },
  {
    value: '100ml',
    label: '100ml'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const AddProductView = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Add new product for sale"
          title="Add product"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name product"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Category"
                name="category"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Special Offer"
                name="specialOffer"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Smell"
                name="Smell"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Volume"
                name="volume"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {volume.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >

              <FormControl component="fieldset">
                <FormLabel component="legend">Sex</FormLabel>
                <RadioGroup row aria-label="position" name="position" defaultValue="female">
                  <FormControlLabel
                    value="female"
                    control={<Radio color="primary" />}
                    label="female"
                    labelPlacement="female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" />}
                    label="male"
                    labelPlacement="male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Add product
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AddProductView.propTypes = {
  className: PropTypes.string
};

export default AddProductView;
