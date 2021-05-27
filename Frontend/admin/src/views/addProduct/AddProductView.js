import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

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
  const [brands, setBrands] = useState(null);
  const [baseNotes, setBaseNotes] = useState(null);
  // const [file, setFile] = useState('');

  useEffect(() => {
    const loadBrands = async () => {
      const tmpBrands = await axios.get('/api/brands');
      setBrands(tmpBrands.data);
    };
    loadBrands();
  }, []);

  useEffect(() => {
    const loadBrands = async () => {
      const tmpBrands = await axios.get('/api/base-notes');
      setBaseNotes(tmpBrands.data);
    };
    loadBrands();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => { object[key] = value; });
    // axios.post('asdfasdfasdf', formData);
    // console.log(object);

    console.log(object);

    // const data = new FormData();
    // data.append('file', object.image);

    // // const data = {
    // //   file: JSON.stringify(object.image)
    // // };

    // const options = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Accept: 'application/ld+json'
    //   }
    // };

    // const result = await axios.post('/api/product_images', data, options);

    // console.log(result);

    await axios.post('/admin/products', {
      name: 'productname',
      description: 'mydescription',
      brand: 'mybrand',
      base_note: 'mybasenote',
      for_women: true,
      price: 100,
      volume: 1000,
      image: '/api/product_image/1'
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="Add new product for sale" title="Add product" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" name="image" onChange={(event) => console.log(event.target.value)} hidden />
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                options={brands}
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Brand"
                    name="brand"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Special Offer"
                name="specialOffer"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                options={baseNotes}
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Base note"
                    name="baseNote"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Volume"
                name="volume"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {volume.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sex</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="female"
                >
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
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button type="submit" color="primary" variant="contained">
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
