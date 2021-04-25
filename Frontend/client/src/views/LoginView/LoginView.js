import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React from 'react';
import { Container, LinksWrapper, StyledForm } from './styles';

const LoginView = () => {
    return (
        <Container>
            <h1>Log in</h1>
            <StyledForm>
                <TextInput
                    width="100%"
                    height="47px"
                    backgroundColor="#EFEFEF"
                    placeholder="Email..."
                ></TextInput>
                <TextInput
                    width="100%"
                    height="47px"
                    backgroundColor="#EFEFEF"
                    placeholder="Password..."
                ></TextInput>
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
