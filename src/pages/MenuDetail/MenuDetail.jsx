import InputField from "../../components/InputField/InputField.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/Button/Button";
import './MenuDetail.css'
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function MenuDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const { register, setValue } = useForm();

    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/menuItems/${id}`, {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                    },
                });
                setItem(response.data);
                setValue("name", response.data.name);
                setValue("unitPrice", response.data.price);
                setValue("description", response.data.description);
                setValue("categoryId", response.data.categoryId);
                setValue("vegetarian", response.data.vegetarian);
            } catch (e) {
                console.error("Failed to fetch item:", e);
            }
        }
        fetchItem();
    }, [id, setValue]);

    return (
        <article className="menu-detail-container">
            <form className="menu-item-details">
                <InputField
                    labelAndId="menu-item-name"
                    labelText="Naam gerecht:"
                    type="text"
                    register={register}
                    registerTitle="name"
                    required={true}
                    maxLength={20}
                />
                <InputField
                    labelAndId="item-price"
                    labelText="Prijs (zonder '€' teken):"
                    type="number"
                    register={register}
                    registerTitle="unitPrice"
                    required={true}
                    min={0}
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
                    </label>
                </div>
                <InputField
                    labelAndId="category-id"
                    labelText="Categorie ID:"
                    type="number"
                    register={register}
                    registerTitle="categoryId"
                    placeholderText="1 = pizza, 2 = pasta, 3 = bijgerecht, 4 = nagerecht"
                    min={0}
                    max={4}
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
                <Button buttonType="button" buttonText="Bevestig wijzigingen" onClick={testFunction}/>
            </form>
            <div className="lower-buttons">
                <Button buttonType="button" buttonText="Terug"/>
                <Button buttonType="button" buttonText="Verwijder gerecht"/>
            </div>
        </article>
)
}

export default MenuDetail;