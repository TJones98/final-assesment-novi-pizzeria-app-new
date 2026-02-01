import './Button.css'

function Button({buttonText, buttonType, onClick}) {
    return (
        <button type={buttonType} onClick={onClick}>
            {buttonText}
        </button>
    )
}

export default Button;