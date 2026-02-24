import PageTitle from '../../components/PageTitle/PageTitle.jsx'
import Card from '../../components/Card/Card.jsx'
import InputField from '../../components/InputField/InputField.jsx'
import { useForm } from 'react-hook-form';
import React from "react";
import Button from "../../components/Button/Button.jsx";
import './PlaceOrder2.css'

function PlaceOrder2() {
    const { register,
        handleSubmit,
        formState: { errors}} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }

    function validateEmail(value) {
        if (value.includes('@')) {
            return true;
        } else {
            return "E-mailadres moet '@' bevatten"
        }
    }

    return (
        <>
            <PageTitle title="Bestellen" subtitle="Ik ga" />
            <Card width={800}>
                <form className="customer-data-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <fieldset className="personalia">
                        <legend>Jouw gegevens:</legend>
                        <div className="name-and-email-fields">
                            <InputField type="text"
                                labelText="Naam:"
                                labelAndId="name-field"
                                register={register}
                                registerTitle="name"
                                required={true}
                                errors={errors.name && <p className="contrast-text">{errors.name.message}</p>}
                                placeholderText="Voor- en achternaam"
                            />

                            <InputField type="text"
                                        labelText="E-mail:"
                                        labelAndId="email-field"
                                        register={register}
                                        registerTitle="email"
                                        required={true}
                                        errors={errors.email && <p className="contrast-text">{errors.email.message}</p>}
                                        placeholderText="naam@emailprovider.com"
                                        validate={validateEmail}
                            />
                        </div>
                        <strong>Afleveradres:</strong>
                        <div className="adres-fields">
                            <InputField type="text"
                                        labelText="Postcode:"
                                        labelAndId="zipcode-field"
                                        register={register}
                                        registerTitle="zipcode"
                                        required={true}
                                        errors={errors.zipcode && <p className="contrast-text">{errors.zipcode.message}</p>}
                                        placeholderText="1234AB"
                            />
                            <InputField type="number"
                                        labelText="Huisnummer:"
                                        labelAndId="house-number-field"
                                        register={register}
                                        registerTitle="houseNumber"
                                        required={true}
                                        errors={errors.houseNumber && <p className="contrast-text">{errors.houseNumber.message}</p>}
                                        placeholderText="1"
                                        min={1}
                            />
                            <InputField type="text"
                                        labelText="Toevoeging:"
                                        labelAndId="house-number-addition-field"
                                        register={register}
                                        registerTitle="houseNumberAddition"
                                        required={false}
                                        errors={errors.houseNumber && <p className="contrast-text">{errors.houseNumber.message}</p>}
                                        placeholderText="Indien van toepassing"
                            />
                            <InputField type="text"
                                        labelText="Straat:"
                                        labelAndId="street-field"
                                        register={register}
                                        registerTitle="street"
                                        required={true}
                                        errors={errors.street && <p className="contrast-text">{errors.street.message}</p>}
                                        placeholderText="Straatweg"
                            />
                            <InputField type="text"
                                        labelText="Plaats:"
                                        labelAndId="city-field"
                                        register={register}
                                        registerTitle="city"
                                        required={true}
                                        errors={errors.city && <p className="contrast-text">{errors.city.message}</p>}
                                        placeholderText="Utrecht"
                            />
                        </div>
                    </fieldset>
                    <Button
                        buttonType='submit'
                        buttonText='Controleer bestelling'
                    />
                </form>
            </Card>
        </>
    )
}

export default PlaceOrder2