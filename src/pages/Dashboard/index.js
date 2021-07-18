import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import axios from 'axios';
import Header from '../../components/Header';
import Profile from '../../components/Profile';
import Footer from '../../components/Footer';

import { GlobalStyles, lightTheme, darkTheme } from './styles/main';
import { useDarkMode } from './styles/useDarkMode';
import { ThemeProvider } from 'styled-components';

const Main = (props) => {
    const {isAuthenticated, logout } = props;
    const [dashboard, setDashboard] = useState({});
    const [brand, setBrand] = useState({})
    const location = useLocation()
    const [theme, toggleTheme ] = useDarkMode()
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    
    const handleToggleTheme = e => {
        e.preventDefault()
        toggleTheme()
    }

    localStorage.setItem('currentPage', location.pathname)
    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`
                    }
                }
                const response = await axios.get(`http://127.0.0.1:8000/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    if (isAuthenticated) {
                        setDashboard(response.data.dashboard)
                        setBrand(response.data.dashboard.brand)
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
            <GlobalStyles />
            <div className="dashboard-container">
                <Header logout={logout} handleToggleTheme={handleToggleTheme} theme={theme} />
                <Profile dashboard={dashboard} brand={brand} />
                
                {/* ======================== */}
                <div className="container" style={{ paddingBottom: "100px" }}>
                    {props.children} 
                </div>
                {/* ======================== */}
                <Footer />
            </div>
        </ThemeProvider>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(Main)