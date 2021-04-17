import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React, { useState } from 'react';
import { Container, LinksWrapper, StyledForm } from './styles';

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const INPUTS = [
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
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(login);
    };

    return (
        <Container>
            <h1>Log in</h1>
            <StyledForm>
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
                    Log in
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
