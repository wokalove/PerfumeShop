import { yupResolver } from '@hookform/resolvers/yup';
import { login } from 'actions/authActions';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Container, LinksWrapper, StyledForm } from './styles';

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});

const inputs = [
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
];

const LoginView = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        await dispatch(login(data.email, data.password));
    };

    return (
        <Container>
            <h1>Log in</h1>
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
                        {errors[item.name] && (
                            <p>{errors[item.name]?.message}</p>
                        )}
                    </>
                ))}
                <Button type="submit" width="100%" height="47px">
                    {authState.loading ? 'loading...' : 'Log in'}
                </Button>
            </StyledForm>
            <LinksWrapper>
                <a>Forgot password?</a>
                <a>Don't have an account?</a>
            </LinksWrapper>
        </Container>
    );
};

export default LoginView;
