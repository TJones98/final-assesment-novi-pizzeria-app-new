import './Button.css'

function Button({buttonText, buttonType, onClick, disabled}) {
    return (
        <button type={buttonType} onClick={onClick} disabled={disabled}>
            {buttonText}
        </button>
    )
}

export default Button;