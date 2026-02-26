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
                        validate,

}) {
    return (
        <div className="label-and-input">
            <label htmlFor={labelAndId}>
                {labelText}
                <input type={type}
                       placeholder={placeholderText}
                       id={labelAndId}
                       min="1"
                       {...register(registerTitle, {
                           required: required ? "Dit veld is verplicht" : false,
                           min: min ? { value: min, message: `Het huisnummer kan niet lager dan ${min} zijn` } : undefined,
                           validate: validate
                       })}
                />
                {errors}
            </label>
        </div>
    )
}

export default InputField;