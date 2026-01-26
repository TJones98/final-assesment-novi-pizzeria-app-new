import './Button.css'

function Button({buttonText, buttonType}) {
    return (
        <button type={buttonType}>{buttonText}</button>
    )
}

export default Button;