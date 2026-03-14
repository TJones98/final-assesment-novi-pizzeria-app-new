import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {useForm} from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import InputField from '../../components/InputField/InputField.jsx';
import axios from 'axios';
import './CreateNewUser.css'

function CreateNewUser() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const controller = new AbortController();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [success, toggleSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function onSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        toggleSuccess(false);

        try {
            await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                'email': data.email,
                'password': data.password,
                'roles': [
                    data.roles
                ]
            }, {
                headers: {
                    'novi-education-project-id': `${import.meta.env.VITE_PROJECT_ID}`,
                },
                signal: controller.signal,
            });
            toggleSuccess(true)
            console.log("Nieuwe gebruiker aangemaakt")
        } catch(e) {
            console.log("Probleem bij registreren", e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    function redirectToDashboard() {
        navigate('/staff')
    }

    function validateEmail(value) {
        if (value.substring(-11).includes('@palermo.nl')) {
            return true;
        } else {
            return "E-mailadres moet eindigen op '@palermo.nl' "
        }
    }

    return (
        <>
            <PageTitle title="Nieuwe gebruiker" subtitle="Registreer" />
            <Card alignItems="center">
                <form className="register-user-form"  onSubmit={handleSubmit(onSubmit)}>
                    <InputField type="text"
                                labelText="E-mail:"
                                labelAndId="email-field"
                                register={register}
                                registerTitle="email"
                                required={true}
                                minLength={13}
                                errors={errors.email && <p className="contrast-text">{errors.email.message}</p>}
                                placeholderText="naam@palermo.nl"
                                validate={validateEmail}
                    />
                    <InputField type="password"
                                labelText="Wachtwoord:"
                                labelAndId="password-field"
                                register={register}
                                registerTitle="password"
                                required={true}
                                minLength={8}
                                errors={errors.password && <p className="contrast-text">{errors.password.message}</p>}
                    />
                    <label className="roles-input" htmlFor="roles-input">
                        Rol:
                        <select className="roles-selectbox" id="roles-input" {...register("roles")}>
                            <option value="employee">Medewerker</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    <div className="register-user-buttons">
                        <Button buttonType="button" buttonText="Terug" onClick={redirectToDashboard}/>
                        <Button buttonType="submit" buttonText="Registreer" disabled={loading === true}/>
                    </div>
                </form>
            </Card>
            {loading && <strong className="contrast-text">loading...</strong>}
            {error && <strong className="contrast-text">Registreren gebruiker mislukt. Probeer het nog eens.</strong>}
            {success && <strong className="contrast-text">Registreren gebruiker geslaagd! Je kan dit scherm nu sluiten.</strong>}
        </>
    )
}

export default CreateNewUser;