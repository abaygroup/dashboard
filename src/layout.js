import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from './actions/auth';
import i18next from 'i18next';
import Alert from './components/Alert';

const Layout = ({checkAuthenticated, load_user, ...props}) => {

    function handleClick(lang) {
        window.location.reload();
        i18next.changeLanguage(lang)
    }

    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, [checkAuthenticated, load_user])

    return (
        <React.Fragment>
            <nav className="i18next">
                <button onClick={()=>handleClick('ru')} ><i className="fas fa-globe"></i> RU</button>
                <button onClick={()=>handleClick('kz')} ><i className="fas fa-globe"></i> KZ</button>
            </nav>
            <Alert />
            {props.children}
        </React.Fragment>
    )
}

export default connect(null, { checkAuthenticated, load_user })(Layout)