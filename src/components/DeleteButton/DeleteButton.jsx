import './DeleteButton.css'

function DeleteButton({handleClick}) {
    return (
        <button className='delete-button' type="button" onClick={handleClick}>
            X
        </button>
    )
}

export default DeleteButton;
