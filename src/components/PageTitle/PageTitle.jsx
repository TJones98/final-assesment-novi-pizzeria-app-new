import './PageTitle.css'

function PageTitle({subtitle, title}) {
    return (
        <div className="page-title-wrapper">
            <h4 className='page-subtitle'>{subtitle}</h4>
            <h1 className='page-title'>{title}</h1>
        </div>
    )
}

export default PageTitle;