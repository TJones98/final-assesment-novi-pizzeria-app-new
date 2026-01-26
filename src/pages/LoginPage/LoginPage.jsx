import "./LoginPage.css"
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {AuthContext} from '../../contexts/AuthContext';
import {useForm} from 'react-hook-form';
import React, {useContext} from 'react';
import InputField from '../../components/InputField/InputField.jsx';

function LoginPage() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();

    function onSubmit(data) {
        console.log(data);
        login();
    }

    return (
        <>
            <PageTitle title="Welkom terug" subtitle="Medewerkersportaal" />
            <Card alignItems="center">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <InputField type="text"
                            labelText="E-mail:"
                            labelAndId="email-field"
                            register={register}
                            registerTitle="email"
                    />
                    <InputField type="password"
                                labelText="Wachtwoord:"
                                labelAndId="password-field"
                                register={register}
                                registerTitle="password"
                    />
                    <Button buttonType="submit" buttonText="Login" />
                </form>
            </Card>
        </>
    )
}

export default LoginPage;