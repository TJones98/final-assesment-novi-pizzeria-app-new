import InputField from "../../components/InputField/InputField.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/Button/Button";
import './MenuDetail.css'
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MenuDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [success, toggleSuccess] = useState(false);
    const [deleteMessage, toggleDeleteMessage] = useState(false);
    const token = localStorage.getItem('token');
    const { register,
        setValue,
        handleSubmit,
        formState: { errors}
    } = useForm();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchItem() {
            toggleLoading(true);
            toggleError(false);
            try {
                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/menuItems/${id}`, {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                    },
                    signal: controller.signal,
                });
                setItem(response.data);
                setValue("name", response.data.name);
                setValue("unitPrice", response.data.unitPrice);
                setValue("description", response.data.description);
                setValue("categoryId", response.data.categoryId);
                setValue("vegetarian", response.data.vegetarian);
                console.log("Item info ophalen succesvol:", response.data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request geannuleerd:', e);
                    toggleError(false);
                }
                else {
                    console.log("Ophalen van item mislukt", e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        fetchItem();

        return function cleanup() {
            controller.abort();
        };
    }, [id, setValue]);

    function handleFormSubmit(data) {
        console.log(data);

        const controller = new AbortController();

        async function updateItem() {
            toggleLoading(true);
            toggleError(false);
            try {
                await axios.put(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/menuItems/${id}`, {
                    id: id,
                    name: data.name,
                    unitPrice: Number(data.unitPrice),
                    description: data.description,
                    categoryId: Number(data.categoryId),
                    vegetarian: data.vegetarian,
                }, {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                        'Authorization': `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                console.log("Data succesvol gewijzigd");
                toggleSuccess(true)
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request geannuleerd:', e);
                    toggleError(false);
                }
                else {
                    console.log("Wijzigen van item mislukt", e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        updateItem();
        return function cleanup() {
            controller.abort();
        };
    }

    async function deleteItem() {
        const controller = new AbortController();
        toggleLoading(true);
        toggleError(false);
        try {
            await axios.delete(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/menuItems/${id}`, {
                headers: {
                    'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                    'Authorization': `Bearer ${token}`,
                },
                signal: controller.signal,
            })
            console.log("Item succesvol verwijderd")
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log('Request geannuleerd:', e);
                toggleError(false);
            }
            else {
                console.log("Verwijderen van item mislukt", e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
            redirectToMenu()
        }
        deleteItem()
        return function cleanup() {
            controller.abort();
        };
    }

    function redirectToMenu() {
        navigate("/menu");
    }

    return (
        <article className="menu-detail-container">
            {error && <p>Er is iets misgegaan bij het verwerken van de data. Probeer het later nog eens.</p>}
            {loading && <p>Loading...</p>}
            {success && <strong className="contrast-text">Gerecht succesvol gewijzigd!</strong>}
            <form className="menu-item-details" onSubmit={handleSubmit(handleFormSubmit)}>
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
                <Button buttonType="submit" buttonText="Bevestig wijzigingen"/>
            </form>
            <div className="lower-buttons">
                <Button buttonType="button" buttonText="Terug" onClick={redirectToMenu}/>
                <Button buttonType="button" buttonText="Verwijder gerecht" onClick={() => toggleDeleteMessage(true)}/>
            </div>
            {deleteMessage && (
                <>
                    <strong className="contrast-text">Weet je zeker dat je dit gerecht wilt verwijderen? Klik op onderstaande knop om te bevestigen</strong>
                    <Button buttonType="button" buttonText="Verwijderen" onClick={deleteItem}/>
                </>
            )}
        </article>
)
}

export default MenuDetail;