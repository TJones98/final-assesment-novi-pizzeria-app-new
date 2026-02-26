import PageTitle from '../../components/PageTitle/PageTitle.jsx'
import Card from '../../components/Card/Card.jsx'
import InputField from '../../components/InputField/InputField.jsx'
import TimeslotSelecter from '../../components/TimeslotSelecter/TimeslotSelecter'
import { useForm, Controller } from 'react-hook-form';
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Button from "../../components/Button/Button.jsx";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './PlaceOrderPartTwo.css'
import {SubmitOrderContext} from "../../contexts/SubmitOrderContext.jsx";
import {deliveryArea} from "../../constants/restaurant-data.js"

function PlaceOrderPartTwo() {
    const {newOrder, setNewOrder, setCustomer, setOrderDateTimeslot} = useContext(SubmitOrderContext);
    const { register,
        handleSubmit,
        formState: { errors},
        control,
        watch,
        reset
    } = useForm();

    const watchSelectedReferrer = watch('orderDate');

    const navigate = useNavigate();

    useEffect(() => {
        const savedCustomer = JSON.parse(sessionStorage.getItem('customerDetails'));
        const savedOrderDetails = JSON.parse(sessionStorage.getItem('orders'));

        setNewOrder((prevOrder) => ({
            ...prevOrder,
            orders: savedOrderDetails || {},
            customerDetails: savedCustomer || {}
        }));
        console.log(newOrder);

    }, []);

    useEffect(() => {
        sessionStorage.setItem('customerDetails', JSON.stringify(newOrder.customerDetails));
        sessionStorage.setItem('orders', JSON.stringify(newOrder.orders));
    }, [newOrder.customerDetails, newOrder.orders])

    useEffect(() => {
        let defaultValues = {};
        defaultValues.customerName = newOrder.customerDetails.customerName;
        defaultValues.email = newOrder.customerDetails.email;
        defaultValues.zipCode = newOrder.customerDetails.zipCode;
        defaultValues.houseNumber = newOrder.customerDetails.houseNumber;
        defaultValues.houseNumberAddition = newOrder.customerDetails.houseNumberAddition;
        defaultValues.street = newOrder.customerDetails.street;
        defaultValues.city = newOrder.customerDetails.city;
        reset({ ...defaultValues });
    }, []);


    function handleFormSubmit(data) {
        const { orderDate, timeslot, ...customerData } = data;
        setCustomer(customerData);
        setOrderDateTimeslot({ orderDate, timeslot });
        navigate('/place-order-3');
    }

    function validateEmail(value) {
        if (value.includes('@')) {
            return true;
        } else {
            return "E-mailadres moet '@' bevatten"
        }
    }

    function validateZipCode(value) {
        const fourNumbersZipCode = Number(value.substring(0, 4));
        console.log(fourNumbersZipCode);
        if (deliveryArea.includes(fourNumbersZipCode)) {
            return true;
        } else {
            return "Postcode valt niet binnen ons bezorggebied"
        }
    }

    return (
        <>
            <PageTitle title="Bestellen" subtitle="Ik ga" />

            <Card width={800}>
                <form className="customer-data-form" onSubmit={handleSubmit(handleFormSubmit)}>

                    <fieldset className="date-timeslot">
                        <legend>Kies leverdatum en -tijd</legend>

                        <div className="date-timeslot-fields">
                            <Controller
                                name="orderDate"
                                control={control}
                                rules={{ required: "Dit veld is verplicht" }}
                                render={({ field }) => (
                                    <ReactDatePicker
                                        selected={field.value}
                                        onChange={field.onChange}
                                        filterDate={(date) => date.getDay() !== 1 && date.getDay() !== 2}
                                        // geselecteerde datum kan niet een maandag (1) of dinsdag (2) zijn, want dan is het restaurant gesloten
                                        placeholderText="Selecteer eerst een leverdatum"
                                        dateFormat="dd-MM-yyyy"
                                        minDate={new Date()}
                                        // minDate zorgt ervoor dat er niet een datum in het verleden geselecteerd kan worden
                                    />
                                )}
                            />
                            {errors.orderDate && <p className="contrast-text">{errors.orderDate.message}</p>}

                            {/*Laad keuzemenu timeslots pas als datum geselecteerd is.*/}
                            {watchSelectedReferrer && (
                                <>
                                    <TimeslotSelecter date={watchSelectedReferrer} register={register} />
                                    {errors.timeslot && <p className="contrast-text">{errors.timeslot.message}</p>}
                                </>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className="personalia">
                        <legend>Jouw gegevens:</legend>
                        <div className="name-and-email-fields">
                            <InputField type="text"
                                labelText="Naam:"
                                labelAndId="name-field"
                                register={register}
                                registerTitle="customerName"
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
                                        labelAndId="zip-code-field"
                                        register={register}
                                        registerTitle="zipCode"
                                        required={true}
                                        errors={errors.zipCode && <p className="contrast-text">{errors.zipCode.message}</p>}
                                        placeholderText="1234AB"
                                        validate={validateZipCode}
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

export default PlaceOrderPartTwo