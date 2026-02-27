import './InputField.css'

function InputField({
                        register,
                        labelAndId,
                        labelText,
                        type,
                        registerTitle,
                        required,
                        errors,
                        placeholderText,
                        min,
                        max,
                        validate,
                        maxLength,
                        step

}) {
    return (
        <div className="label-and-input">
            <label htmlFor={labelAndId}>
                {labelText}
                <input type={type}
                       placeholder={placeholderText}
                       id={labelAndId}
                       min={min}
                       max={max}
                       maxLength={maxLength}
                       step={step}
                       {...register(registerTitle, {
                           required: required ? "Dit veld is verplicht" : false,
                           min: min ? { value: min, message: `Het getal kan niet lager dan ${min} zijn` } : undefined,
                           max: max ? { value: max, message: `Het getal kan niet hoger dan ${max} zijn` } : undefined,
                           maxLength: maxLength ? { value: maxLength, message: `Veld mag maximaal ${maxLength} karakters bevatten`} : undefined,
                           validate: validate
                       })}
                />
                {errors}
            </label>
        </div>
    )
}

export default InputField;