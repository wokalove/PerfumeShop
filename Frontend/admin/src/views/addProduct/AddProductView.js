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
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../axiosConfig';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AddProductView = ({ className, ...rest }) => {
  const isInitialMount = useRef(true);
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [brands, setBrands] = useState(null);
  const [baseNotes, setBaseNotes] = useState(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (success) {
      navigate('../products');
    }
  }, [success]);

  useEffect(() => {
    const loadBrands = async () => {
      const tmpBrands = await axios.get('/api/brands');
      setBrands(tmpBrands.data);
    };
    loadBrands();
  }, []);

  useEffect(() => {
    const loadBaseNotes = async () => {
      const tmpBrands = await axios.get('/api/base-notes');
      setBaseNotes(tmpBrands.data);
    };
    loadBaseNotes();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    const object = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => { object[key] = value; });
    const data = new FormData();
    data.append('file', object.image);

    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/ld+json',
      }
    };

    try {
      await axios.post('/api/product_images', data, options);

      await axios.post('/admin/products', {
        name: object.name,
        description: object.description,
        brand: object.brand,
        base_note: object.baseNote,
        for_women: object.position === 'female',
        price: parseInt(object.price, 10),
        volume: parseInt(object.volume, 10),
        image: '/api/product_images/13' // TODO: id from response
      });

      setSuccess(true);
    } catch (e) {
      alert(e);
    }

    setLoading(false);
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
                <input type="file" name="image" hidden />
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
                debug
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
                debug
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
                label="Volume [ml]"
                name="volume"
                type="number"
                variant="outlined"
              />
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
          <Button type="submit" disabled={loading} color="primary" variant="contained">
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
