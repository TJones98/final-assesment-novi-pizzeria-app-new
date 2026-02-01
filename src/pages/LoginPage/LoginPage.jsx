import "./LoginPage.css"
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {AuthContext} from '../../contexts/AuthContext';
import {useForm} from 'react-hook-form';
import React, {useContext, useEffect} from 'react';
import InputField from '../../components/InputField/InputField.jsx';
import axios from 'axios';

function LoginPage() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const controller = new AbortController();

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function onSubmit(data) {
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                'email': data.email,
                'password': data.password,
            }, {
                headers: {
                    'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                },
                signal: controller.signal,
            });
            login(response.data);
        } catch(e) {
            console.log("Probleem bij inloggen", e);
        }
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