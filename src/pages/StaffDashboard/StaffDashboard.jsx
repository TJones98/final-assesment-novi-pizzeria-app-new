import Card from '../../components/Card/Card.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import './StaffDashboard.css'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";

function StaffDashboard() {
    const {userData} = useContext(AuthContext);

    return (
        <>
            <PageTitle title="Personeelsdashboard" subtitle="Werk ze vandaag!"/>
            <div className="dashboard-buttons">
                <Button buttonType="button" buttonText="Openstaande bestellingen" onClick="onClick"/>
                <Button buttonType="button" buttonText="Afgeronde bestellingen" onClick="onClick"/>
                <Button buttonType="button" buttonText="Bewerk menu" disabled={!userData.roles.includes("admin")} onClick="onClick"/>
            </div>
            <Card>
                <p>card content</p>
            </Card>
        </>
)}

export default StaffDashboard;