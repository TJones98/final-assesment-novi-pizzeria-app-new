// TODO: import react hook form, import context, write onsubmit function, update button to submit

import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {useForm} from 'react-hook-form';

function LoginPage() {
    return (
        <>
            <PageTitle title="Welkom terug" subtitle="Medewerkersportaal" />
            <Card>
                <p>test</p>
                <Button buttonText="Login" />
            </Card>
        </>
    )
}

export default LoginPage;