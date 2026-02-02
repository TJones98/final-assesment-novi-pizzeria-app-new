import PageTitle from '../components/PageTitle/PageTitle.jsx';
import {Link} from 'react-router-dom';

function PageNotFound() {
    return (
        <>
            <PageTitle title="Pagina niet gevonden" subtitle="Error 404" />
            <p> Ga terug naar <Link to="/">home pagina</Link> </p>
        </>
    )
}

export default PageNotFound;