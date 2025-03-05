import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './context/user.context';
import axios from './config/axios';
import { toast } from 'react-toastify';

function RefreshHandler({ setIsAuthenticated }) { 
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
            setIsAuthenticated(true);
            
            // Set axios default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Only fetch projects if we're not already on the home page
            if (location.pathname === '/login') {
                navigate('/', { replace: true });
            }
        } else {
            setIsAuthenticated(false);
            if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname!=='/reset-password') {
                navigate('/login');
            }
        }
    }, [navigate, setIsAuthenticated, setUser, location.pathname]);

    return null;
}

export default RefreshHandler;