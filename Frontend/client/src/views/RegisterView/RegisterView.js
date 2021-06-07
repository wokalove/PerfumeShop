import { yupResolver } from '@hookform/resolvers/yup';
import { login, register as registerAction } from 'actions/authActions';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import {
  Container,
  ExternalContainer,
  LinksWrapper,
  StyledForm
} from './styles';

const schema = yup.object().shape({
  name: yup.string().required().min(2).max(100),
  surname: yup.string().required().min(2).max(100),
  email: yup.string().required().email().max(65),
  password: yup.string().required().min(6).max(50),
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const inputs = [
  {
    placeholder: 'name...',
    name: 'name',
    type: 'text',
  },
  {
    placeholder: 'surname...',
    name: 'surname',
    type: 'text',
  },
  {
    placeholder: 'email...',
    name: 'email',
    type: 'email',
  },
  {
    placeholder: 'password...',
    name: 'password',
    type: 'password',
  },
  {
    placeholder: 'confirm...',
    name: 'confirm',
    type: 'password',
  },
];

const RegisterView = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    authState.isLoggedIn && navigate('/shop');
  }, [authState.isLoggedIn]);

  const onSubmit = async (data) => {
    await dispatch(
      registerAction(data.name, data.surname, data.email, data.password)
    );
    await dispatch(login(data.email, data.password));
  };

  return (
    <ExternalContainer>
      <Container>
        <h1>Create an account</h1>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((item, index) => (
            <>
              <TextInput
                key={index}
                type={item.type}
                width="100%"
                height="47px"
                backgroundColor="#EFEFEF"
                placeholder={item.placeholder}
                {...register(item.name)}
              />
              {errors[item.name] && <p>{errors[item.name]?.message}</p>}
            </>
          ))}
          <Button type="submit" width="100%" height="47px">
            {authState.loading ? 'loading...' : 'Register'}
          </Button>
        </StyledForm>
        <LinksWrapper>
          <a>Already have an account?</a>
        </LinksWrapper>
      </Container>
    </ExternalContainer>
  );
};

export default RegisterView;
