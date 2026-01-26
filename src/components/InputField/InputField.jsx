import './InputField.css'

function InputField({register, labelAndId, labelText, type, registerTitle}) {
    return (
        <div className="label-and-input">
            <label htmlFor={labelAndId}>
                {labelText}
                <input type={type}
                       id={labelAndId}
                       {...register(registerTitle)}
                />
            </label>
        </div>
    )
}

export default InputField;