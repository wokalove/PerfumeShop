import { yupResolver } from '@hookform/resolvers/yup';
import { register as registerAction } from 'actions/authActions';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Container, LinksWrapper, StyledForm } from './styles';

const schema = yup.object().shape({
    username: yup.string().required().min(3).max(100),
    email: yup.string().required().email().max(65),
    password: yup.string().required().min(6).max(50),
    confirm: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

const inputs = [
    {
        placeholder: 'username...',
        name: 'username',
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        await dispatch(
            registerAction(data.username, data.email, data.password)
        );
    };

    return (
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
                        {errors[item.name] && (
                            <p>{errors[item.name]?.message}</p>
                        )}
                    </>
                ))}
                <Button type="submit" width="100%" height="47px">
                    Register
                </Button>
            </StyledForm>
            <LinksWrapper>
                <a>Already have an account?</a>
            </LinksWrapper>
        </Container>
    );
};

export default RegisterView;
