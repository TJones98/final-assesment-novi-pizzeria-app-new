import PageTitle from '../../components/PageTitle/PageTitle.jsx'
import Card from '../../components/Card/Card.jsx'
import InputField from '../../components/InputField/InputField.jsx'
import { useForm } from 'react-hook-form';
import React from "react";
import Button from "../../components/Button/Button.jsx";
import './PlaceOrder2.css'

function PlaceOrder2() {
    const { register, handleSubmit } = useForm();

    function handleFormSubmit(data) {
        console.log(data);
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
                            />
                            <InputField type="text"
                                        labelText="E-mail:"
                                        labelAndId="email-field"
                                        register={register}
                                        registerTitle="email"
                            />
                        </div>
                        <strong>Afleveradres:</strong>
                        <div className="adres-fields">
                            <InputField type="text"
                                        labelText="Postcode:"
                                        labelAndId="zipcode-field"
                                        register={register}
                                        registerTitle="zipcode"
                            />
                            <InputField type="number"
                                        labelText="Huisnummer:"
                                        labelAndId="house-number-field"
                                        register={register}
                                        registerTitle="houseNumber"
                            />
                            <InputField type="text"
                                        labelText="Toevoeging:"
                                        labelAndId="house-number-addition-field"
                                        register={register}
                                        registerTitle="houseNumberAddition"
                            />
                            <InputField type="text"
                                        labelText="Straat:"
                                        labelAndId="street-field"
                                        register={register}
                                        registerTitle="street"
                            />
                            <InputField type="text"
                                        labelText="Plaats:"
                                        labelAndId="city-field"
                                        register={register}
                                        registerTitle="city"
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