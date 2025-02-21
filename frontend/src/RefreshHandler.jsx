import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) { 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/login' || location.pathname === '/') {
                navigate('/');
            }
        }
    }, [ navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;


