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
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import theme from 'src/theme';
import * as Yup from 'yup';
import axios from '../../../axiosConfig';

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    multiline: false,
  },
  {
    name: 'brand',
    label: 'Brand',
    type: 'text',
    multiline: false,
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    multiline: false,
  },
  {
    name: 'offer',
    label: 'Special Offer',
    type: 'number',
    multiline: false,
  },
  {
    name: 'baseNote',
    label: 'Base Note',
    type: 'text',
    multiline: false,
  },
  {
    name: 'volume',
    label: 'Volume [ml]',
    type: 'number',
    multiline: false,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    multiline: true,
  }
];

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(3)
  }
}));

const ProductView = ({ className, ...rest }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        alert(e);
      }
    };
    loadProduct();
  }, [id]);

  async function onSubmit(data) {
    try {
      await axios.put(`/admin/products/${id}`, {
        name: data.name,
        description: data.description,
        brand: data.brand,
        base_note: data.baseNote,
        for_women: data.sex === 'female',
        price: parseInt(data.price, 10),
        volume: parseInt(data.volume, 10),
        image: product.image
      });

      if (data.offer) {
        if (product.new_price) {
          await axios.put(`/admin/offers/${id}`, {
            product_id: id,
            new_price: data.offer
          });
        } else {
          await axios.post('/admin/offers', {
            product_id: id,
            price: data.offer
          });
        }
      } else if (product.new_price) {
        await axios.delete(`/admin/offers/${product.offer_id}`);
      }

      navigate('../../products');
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Formik
          initialValues={{
            name: product?.name ?? '',
            brand: product?.brand ?? '',
            price: product?.price ?? '',
            offer: product?.new_price ?? '',
            baseNote: product?.base_note ?? '',
            volume: product?.volume ?? '',
            description: product?.description ?? '',
            sex: product?.for_women ? 'female' : 'male'
          }}
          validationSchema={
            Yup.object().shape({
              name: Yup.string().required(),
              brand: Yup.string().required(),
              price: Yup.number().required(),
              offer: Yup.number(),
              baseNote: Yup.string().required(),
              volume: Yup.number().required(),
              description: Yup.string(),
            })
          }
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <CardHeader subheader="Update product details" title={product?.name ?? 'product'} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  {fields.map((field) => (
                    <Grid key={field?.name} item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched[field?.name] && errors[field?.name])}
                        helperText={touched[field?.name] && errors[field?.name]}
                        fullWidth
                        label={field?.label}
                        name={field?.name}
                        type={field?.type}
                        multiline={field?.multiline}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[field?.name]}
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                  <Grid item md={6} xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Sex</FormLabel>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="sex"
                        defaultValue="female"
                        onChange={(event) => setFieldValue('sex', event.currentTarget.value)}
                        value={values.sex}
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
                <Button type="submit" disabled={isSubmitting} color="primary" variant="contained">
                  Update Product
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

ProductView.propTypes = {
  className: PropTypes.string
};

export default ProductView;
