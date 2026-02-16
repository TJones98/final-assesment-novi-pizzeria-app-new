import "./LoginPage.css"
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {AuthContext} from '../../contexts/AuthContext';
import {useForm} from 'react-hook-form';
import React, {useContext, useEffect, useState} from 'react';
import InputField from '../../components/InputField/InputField.jsx';
import axios from 'axios';

function LoginPage() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit, formState: { errors }} = useForm();
    const controller = new AbortController();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function onSubmit(data) {
        toggleError(false);
        toggleLoading(true);

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
            toggleError(true);
        } finally {
            toggleLoading(false);
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
                    {errors.email && <p className="contrast-text">{errors.email.message}</p>}
                    <InputField type="password"
                                labelText="Wachtwoord:"
                                labelAndId="password-field"
                                register={register}
                                registerTitle="password"
                    />
                    {errors.password && <p className="contrast-text">{errors.password.message}</p>}
                    <Button buttonType="submit" buttonText="Login" disabled={loading === true}/>
                </form>
            </Card>
            {loading && <strong className="contrast-text">loading...</strong>}
            {error && <strong className="contrast-text">Inloggegevens onjuist. Probeer het nog eens.</strong>}
        </>
    )
}

export default LoginPage;