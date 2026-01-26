import Button from '../../components/Button/Button.jsx';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';

function StaffPage() {
    const {logout} = useContext(AuthContext);

    return (
        <>
            <h1>Staff Page</h1>
            <Button type="button"
                    buttonText="Afmelden"
                    onClick={logout}
            />
        </>
)}

export default StaffPage;