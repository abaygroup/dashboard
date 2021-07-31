import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import axios from 'axios';

import Header from '../../components/Header';
import Profile from '../../components/Profile';
import Footer from '../../components/Footer';
import UserProfile from '../../components/UserProfile';
import FullLoader from '../../components/FullScreen';

import { GlobalStyles, lightTheme, darkTheme } from './styles/main';
import { useDarkMode } from './styles/useDarkMode';
import { ThemeProvider } from 'styled-components';


import { BACKEND_URL, config } from '../../actions/types';

const Main = (props) => {
    const {isAuthenticated, logout } = props;
    const [dashboard, setDashboard] = useState({});
    const [brand, setBrand] = useState({})
    const location = useLocation()
    const [theme, toggleTheme ] = useDarkMode()
    const [loader, setLoader] = useState(true);
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    
    // Change theme
    const handleToggleTheme = e => {
        e.preventDefault()
        toggleTheme()
    }

    localStorage.setItem('currentPage', location.pathname)

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const response = await axios.get(BACKEND_URL, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    if (isAuthenticated) {
                        setDashboard(response.data.dashboard)
                        setBrand(response.data.dashboard.brand)
                        setLoader(false)
                    }
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return <Redirect to="/accounts/login" />
    }

    
    document.title = `${brand.brandname || "..."} | Панель управления`;
    return (
        <ThemeProvider theme={themeMode}>
            {loader ? <FullLoader theme={theme} /> : 
            <React.Fragment>
                <GlobalStyles />
                {dashboard.branch ? 
                    <div className="dashboard-container">
                    <Header logout={logout} handleToggleTheme={handleToggleTheme} theme={theme} />
                    <Profile dashboard={dashboard} brand={brand} />
                    
                    {/* ======================== */}
                    <div className="container" style={{ paddingBottom: "100px" }}>
                        {props.children} 
                    </div>
                    {/* ======================== */}
                    <Footer />
                </div>:
                <UserProfile dashboard={dashboard} brand={brand} logout={logout} handleToggleTheme={handleToggleTheme} theme={theme} />}
            </React.Fragment>
            }
        </ThemeProvider>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(Main)