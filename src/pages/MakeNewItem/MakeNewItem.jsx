import InputField from '../../components/InputField/InputField.jsx'
import Button from "../../components/Button/Button.jsx";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import './MakeNewItem.css'
import axios from "axios";

function MakeNewItem () {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const { register,
        handleSubmit,
        formState: { errors}
    } = useForm();

    function handleFormSubmit(data) {
        const controller = new AbortController();

        async function submitNewItem() {
            toggleLoading(true);
            toggleError(false);

            try {
                await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/menuItems', {
                    name: data.name,
                    unitPrice: Number(data.unitPrice),
                    description: data.description,
                    categoryId: Number(data.categoryId),
                    vegetarian: data.vegetarian === "true",
                }, {
                    headers: {
                        'novi-education-project-id': `${import.meta.env.VITE_PROJECT_ID}`,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal,
                });
                console.log("Nieuw gerecht aangemaakt")
                navigate('/menu')
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request geannuleerd:', e);
                    toggleError(false);
                }
                else {
                    console.log("Aanmaken nieuw gerecht mislukt", e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        submitNewItem()
        return function cleanup() {
            controller.abort();
        }
    }

    function redirectToMenu() {
        navigate("/menu");
    }

    return (
        <>
            {error && <p>Er is iets misgegaan bij het verwerken van de data. Probeer het later nog eens.</p>}
            {loading && <p>Loading...</p>}
            <form className='create-item-form' onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField
                    labelAndId="menu-item-name"
                    labelText="Naam gerecht:"
                    type="text"
                    register={register}
                    registerTitle="name"
                    required={true}
                    maxLength={20}
                    errors={errors.name && <p className="contrast-text">{errors.name.message}</p>}
                />
                <InputField
                    labelAndId="item-price"
                    labelText="Prijs (zonder '€' teken):"
                    type="number"
                    register={register}
                    registerTitle="unitPrice"
                    required={true}
                    min={0}
                    step="0.01"
                    errors={errors.unitPrice && <p className="contrast-text">{errors.unitPrice.message}</p>}
                />
                <div className="divergent-input-fields">
                    <label htmlFor="item-description">
                        Beschrijving:
                        <textarea
                            id="item-description"
                            rows="6"
                            cols="40"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Dit veld is verplicht',
                                },
                                minLength: {
                                    value: 50,
                                    message: 'Input moet minstens 50 karakters bevatten',
                                },
                                maxLength: {
                                    value: 100,
                                    message: 'Input mag maximaal 100 karakters bevatten',
                                }
                            })}
                        >
                            </textarea>
                        {errors.description && <p className="contrast-text">{errors.description.message}</p>}
                    </label>
                </div>
                <InputField
                    labelAndId="category-id"
                    labelText="Categorie ID:"
                    type="number"
                    register={register}
                    registerTitle="categoryId"
                    placeholderText="1 = pizza, 2 = pasta, 3 = bijgerecht, 4 = nagerecht"
                    min={1}
                    max={4}
                    step={1}
                    errors={errors.categoryId && <p className="contrast-text">{errors.categoryId.message}</p>}
                />
                <div className="divergent-input-fields">
                    <label htmlFor="vegetarian">
                        Is dit gerecht vegetarisch?
                        <select className="vegetarian-selectbox" id="vegetarian" {...register("vegetarian")}>
                            <option value="true">Ja</option>
                            <option value="false">Nee</option>
                        </select>
                    </label>
                </div>
                <Button buttonType="submit" buttonText="Maak nieuw gerecht"/>
                <Button buttonType="button" buttonText="Terug" onClick={redirectToMenu}/>
        </form>
        </>
    )
}


export default MakeNewItem;