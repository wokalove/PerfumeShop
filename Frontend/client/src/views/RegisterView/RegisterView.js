import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React, { useState } from 'react';
import { Container, LinksWrapper, StyledForm } from './styles';

const RegisterView = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const INPUTS = [
        {
            type: 'text',
            placeholder: 'Name...',
            updateFunc: setName,
        },
        {
            type: 'text',
            placeholder: 'Surname...',
            updateFunc: setSurname,
        },
        {
            type: 'email',
            placeholder: 'Email...',
            updateFunc: setEmail,
        },
        {
            type: 'password',
            placeholder: 'Password...',
            updateFunc: setPassword,
        },
        {
            type: 'password',
            placeholder: 'Confirm password...',
            updateFunc: setConfirm,
        },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('register');
    };

    return (
        <Container>
            <h1>Create an account</h1>
            <StyledForm onSubmit={handleSubmit}>
                {INPUTS.map((item, index) => (
                    <TextInput
                        key={index}
                        type={item.type}
                        width="100%"
                        height="47px"
                        backgroundColor="#EFEFEF"
                        placeholder={item.placeholder}
                        onChange={(event) =>
                            item.updateFunc(event.target.value)
                        }
                    />
                ))}
                <Button width="100%" height="47px">
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
