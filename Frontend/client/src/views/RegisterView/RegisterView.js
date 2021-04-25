import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import React from 'react';
import { Container, LinksWrapper, StyledForm } from './styles';

const RegisterView = () => {
    return (
        <Container>
            <h1>Create an account</h1>
            <StyledForm>
                <TextInput
                    width="100%"
                    height="47px"
                    backgroundColor="#EFEFEF"
                    placeholder="Name..."
                ></TextInput>
                <TextInput
                    width="100%"
                    height="47px"
                    backgroundColor="#EFEFEF"
                    placeholder="Surname..."
                ></TextInput>
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
                <TextInput
                    width="100%"
                    height="47px"
                    backgroundColor="#EFEFEF"
                    placeholder="Confirm password..."
                ></TextInput>
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
